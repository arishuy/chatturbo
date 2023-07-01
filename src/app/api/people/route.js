import connect from '@/utils/db';
import Group from "@/models/group";
import User from "@/models/user";
import Message from "@/models/message";
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const GET = async (req) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    const myUser = await User.findById(session.sub);
    // get 5 users not in friends list
    const users = await User.find({
        _id: { $nin: [...myUser.friends, session.sub] },
    }).limit(5);
    return new NextResponse(JSON.stringify(users), { status: 200 });
};
