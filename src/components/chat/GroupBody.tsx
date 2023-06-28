import React from 'react'
import MessageCard from './MessageCard'
import { useSession } from 'next-auth/react';
import {
  Box
} from "@mui/material";
import { useRef, useEffect } from 'react';
import { pusherClient } from '@/libs/pusher';
import { find } from 'lodash'
import MessageInput from './MessageInput';
import { setImmediate } from 'timers';
import TypingIndicator from './TypingIndicator';



interface GroupBodyProps {
  id: string
}

const GroupBody = ({ id }: GroupBodyProps) => {
  const { data: session } = useSession();
  const [peopleTyping, setPeopleTyping] = React.useState([] as any);
  const [initialMessages, setInitialMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  async function getAllMessages() {
    const messages = await fetch(`/api/group/message/${id}`, {
      method: "GET",
    });
    const data = await messages.json();
    return data;
  }
  async function seenMessages() {
    const messages = await fetch(`/api/group/${id}/seen`, {
      method: "POST",
    });
    const data = await messages.json();
    return data;
  }
  const scrollToMenu = (ref: any) => {
    setImmediate(() => ref.current.scrollIntoView({behavior: "smooth",inline: "center", }));
};
  useEffect(() => {
    seenMessages();
  }, [id])
  useEffect(() => {
    getAllMessages().then((res) => {
      setInitialMessages(res);
      scrollToMenu(bottomRef);
    })
  }, []);
  useEffect(() => {
    pusherClient.subscribe(id);
    scrollToMenu(bottomRef);

    let clearInterval = 900; //0.9 seconds
     let clearTimerId: NodeJS.Timeout | undefined;
    const messageHandler = (message: any) => {
      seenMessages();
      setInitialMessages((current: any) => {
        if (find(current, { _id: message._id })) {
          return current;
        }
        return [...current, message];
      });
      scrollToMenu(bottomRef);
    };
    const updatedMessageHandler = (newMessage: any) => {
      setInitialMessages((current : any) =>
        current.map((currentMessage:any) => {
          if (currentMessage._id === newMessage._id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
      scrollToMenu(bottomRef);
    };
    const isUserTypingHandler = (user: any) => {
       if (user._id === session?.user._doc._id) {
         return;
       }
      setPeopleTyping((current: any) => {
        if (user._id === session?.user._doc._id) {
          return current;
        }
       if (current.some((u: any) => u._id === user._id)) {
         return current;
        }
        return [...current, user];
      });
      clearTimeout(clearTimerId); // Clear the previous timer

      clearTimerId = setTimeout(() => {
        // Clear the "user is typing" message
        setPeopleTyping((current: any) =>
          current.filter((u: any) => u._id !== user._id)
        );
      }, 1500); // 0.9 seconds
    }
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("messages:update", updatedMessageHandler);
    pusherClient.bind("user:typing", isUserTypingHandler);


    return () => {
      pusherClient.unsubscribe(id);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updatedMessageHandler);
      pusherClient.unbind("user:typing", isUserTypingHandler);
    }
  }, [id])
  return (
    <>
      <Box
        sx={{
          height: "80vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Box>
          {initialMessages.map((message: any) => (
            <MessageCard
              key={message._id}
              avatar={
                message.sender._id === session?.user._doc._id
                  ? ""
                  : message.sender.avatar
              }
              title={
                message.sender._id === session?.user._doc._id
                  ? ""
                  : message.sender.name + " " + message.sender.surname
              }
              position={
                message.sender._id === session?.user._doc._id ? "right" : "left"
              }
              text={message.content}
              date={new Date(message.createdAt).toLocaleString()}
              type={message.type ? message.type : "text"}
              seenBy={message.seenBy}
            />
          ))}
        </Box>

        <Box>
          {peopleTyping.map((person: any) => (
            <TypingIndicator
              key={person._id}
              name={person.name}
              surname={person.surname}
              avatar={person.avatar}
            />
          ))}
        </Box>
        <div ref={bottomRef}></div>
      </Box>
      <Box
        sx={{
          bottom: "0",
          padding: "15px 20px",
        }}
      >
        <MessageInput groupId={id} />
      </Box>
    </>
  );
}

export default GroupBody