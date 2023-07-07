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
    await Reminder.findByIdAndDelete(params.id);
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
};
