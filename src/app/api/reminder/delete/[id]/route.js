import connect from "@/utils/db";
import Group from "@/models/group";
import Message from "@/models/message";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Reminder from "@/models/reminder";


export const DELETE = async (req, { params }) => {
  await connect();
    const session = await getToken({ req, secret: process.env.SECRET }); 
    if (!session) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }
  const reminder = await Reminder.findById(params.id);
  if (reminder.creator != session.user._doc._id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  await reminder.findByIdAndDelete(params.id);
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
};
