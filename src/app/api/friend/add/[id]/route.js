import connect from '@/utils/db';
import Group from "@/models/group";
import User from "@/models/user";
import Message from "@/models/message";
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const POST = async (req, { params }) => {
    const session = await getToken({ req, secret: process.env.SECRET });
    await connect();
    const myID = session.sub;
    const requestID = params.id;
    const users = await User.findById(requestID);
    if (!users) {
        return new NextResponse('User not found', { status: 404 });
    }
    if (users.friends.includes(myID)) {
        return new NextResponse('Already friends', { status: 400 });
    }
    if (users.waitingAcceptedFriends.includes(myID)) {
        return new NextResponse('Already sent request', { status: 400 });
    }
    await User.findByIdAndUpdate(requestID, {
        $push: { waitingAcceptedFriends: myID },
    });
    await User.findByIdAndUpdate(myID, {
        $push: { waitingRequestFriends: requestID },
    });
    return new NextResponse('Request Successfully', {
        status: 200,
    });
};
