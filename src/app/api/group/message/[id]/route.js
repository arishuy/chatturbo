import connect from "@/utils/db";
import Group from "@/models/group";
import Message from "@/models/message";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req, { params }) => {
  await connect();
  const session = await getToken({ req, secret: process.env.SECRET });
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const messages = await Message.find({ recipientGroup: params.id })
    .sort({ createdAt: -1 }) 
    .limit(50).populate("sender", { name: 1, surname: 1, avatar: 1 }).populate("recipient", { name: 1, surname: 1, avatar: 1 });
  return new NextResponse(JSON.stringify(messages.reverse()), { status: 200 });
};
