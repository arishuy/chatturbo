import connect from "@/utils/db";
import Group from "@/models/group";
import User from "@/models/user";
import Message from "@/models/message";
import Reminder from "@/models/reminder";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const POST = async (req) => {
  await connect();
  const session = await getToken({ req, secret: process.env.SECRET });
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const myId = session.sub;
  const body = await req.json();
  const { title, description, startDateTime, startTime, endTime, color, group, location } = body;
  if (group == "") {
    const reminder = await Reminder.create({
      creator: myId,
      title,
      location,
      description,
      startDateTime,
      startTime,
      endTime,
      color,
      group: null,
      participants: [myId]
  });
  return new NextResponse(JSON.stringify(reminder), { status: 200 });
  }
  else 
  {
    const reminder = await Reminder.create({
      creator: myId,
      title,
      location,
      description,
      startDateTime,
      startTime,
      endTime,
    color,
      group,
      participants: [myId]
  });
  return new NextResponse(JSON.stringify(reminder), { status: 200 });
  }
};
