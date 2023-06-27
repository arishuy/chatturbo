import connect from "@/utils/db";
import Group from "@/models/group";
import User from "@/models/user";
import Message from "@/models/message";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { pusherServer } from "@/libs/pusher";

export const POST = async (req) => {
  await connect();
  const session = await getToken({ req, secret: process.env.SECRET });
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const myId = session.sub;
  const body = await req.json();
  const { recipient, recipientGroup, content, parentMessage, hearts,type } = body;
  const message = await Message.create({
    sender: myId,
    recipient,
    recipientGroup,
    content,
    parentMessage,
    hearts,
    type
  });
  const newMessage = await message.populate("sender", {
    name: 1,
    surname: 1,
    avatar: 1,
  });
  const groupUpdate = await Group.findByIdAndUpdate(
    recipientGroup,
    { latestMessage: message._id },
    { new: true } // Add this option to return the updated document
  )
    .populate("members", { name: 1, surname: 1, avatar: 1 })
    .populate("latestMessage")
    .lean();
  await pusherServer.trigger(recipientGroup, "messages:new", newMessage);
  groupUpdate.members.map((member) => {
    const id = member._id.toString();
    pusherServer.trigger(id, "group:update", groupUpdate);
  });
  return new NextResponse("Message sent", { status: 200 });
};
