import connect from "@/utils/db";
import Group from "@/models/group";
import User from "@/models/user";
import Message from "@/models/message";
import Reminder from "@/models/reminder";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const PUT = async (req, {params}) => {
  await connect();
  const session = await getToken({ req, secret: process.env.SECRET });
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
    const myId = session.sub;
  const reminder = await Reminder.findById(params.id);
  if (reminder.participants.includes(myId)) {
    return new NextResponse("Already a participant", { status: 401 });
  }
  reminder.participants.push(myId);
  await Reminder.findByIdAndUpdate(params.id, reminder);
    return new NextResponse(JSON.stringify("participated successfully"), { status: 200 });
};
