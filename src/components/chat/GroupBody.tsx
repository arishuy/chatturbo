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



interface GroupBodyProps {
  id: string
}

const GroupBody = ({ id }: GroupBodyProps) => {
  const { data: session } = useSession();
  const [initialMessages, setInitialMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
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
  useEffect(() => {
    seenMessages();
  }, [id])
  useEffect(() => {
    getAllMessages().then((res) => {
      setInitialMessages(res);
    })
  }, []);
  useEffect(() => {
    pusherClient.subscribe(id);
    const messageHandler = (message: any) => {
      seenMessages();
      setInitialMessages((current: any) => {
        if (find(current, { _id: message._id })) {
          return current;
        }
        return [...current, message];
      });
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
    };
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("messages:update", updatedMessageHandler);

    return () => {
      pusherClient.unsubscribe(id);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updatedMessageHandler);
    }
  }, [id])

  return (
    <>
      <Box
        sx={{
          height: "80vh",
          overflowY: "auto",
          overflowX: "hidden"
        }}
      >
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
      <Box
        sx={{
          bottom: "0",
          padding: "15px 20px",
        }}
      >
        <MessageInput
          groupId={id}
        />
      </Box>
    </>
  );
}

export default GroupBody