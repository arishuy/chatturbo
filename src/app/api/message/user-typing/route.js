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
   const body = await req.json();
    const { group_id } = body;
    const currentUser = {
        _id: session.sub,
        name: session?._doc.name,
        surname: session?._doc.surname,
        avatar: session?._doc.avatar,
    }
    pusherServer.trigger(group_id, "user:typing", 
        currentUser,
    );
  return new NextResponse(JSON.stringify("User typing"), { status: 200 });
};
