import connect from '@/utils/db';
import Group from "@/models/group";
import User from "@/models/user";
import Message from "@/models/message";
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const POST = async (req, {params}) => {
    const session = await getToken({ req, secret: process.env.SECRET });
    await connect();
    const myID = session.sub;
    const requestID = params.id;
    const users = await User.findById(requestID);
    if (!users) {
        return new NextResponse('User not found', { status: 404 });
    }
    if (users.friends.includes(myID)) {
        await User.findByIdAndUpdate(requestID, {
            $pull: { friends: myID },
        });
        await User.findByIdAndUpdate(myID, {
            $pull: { friends: requestID },
        });
        return new NextResponse('Remove Successfully', { status: 200 });
    }
    if (users.waitingAcceptedFriends.includes(myID)) {
        await User.findByIdAndUpdate(requestID, {
            $pull: { waitingAcceptedFriends: myID },
        });
        await User.findByIdAndUpdate(myID, {
            $pull: { waitingRequestFriends: requestID },
        })
        return new NextResponse('Remove Successfully', { status: 200 });
    }
};
