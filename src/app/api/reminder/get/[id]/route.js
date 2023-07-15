import connect from "@/utils/db";
import Group from "@/models/group";
import Message from "@/models/message";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Reminder from "@/models/reminder";

export const GET = async (req, { params }) => {
  await connect();
  const session = await getToken({ req, secret: process.env.SECRET });
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const reminder = await Reminder.find({ group: params.id }).populate(
    "participants",
    { avatar: 1 }
  );
  return new NextResponse(JSON.stringify({ reminder }), { status: 200 });
};
