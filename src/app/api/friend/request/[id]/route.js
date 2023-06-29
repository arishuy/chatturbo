import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
    await connect();
    const id = params.id;
    const myUser = await User.findById(id).populate('waitingAcceptedFriends');
    return new NextResponse(JSON.stringify(myUser.waitingAcceptedFriends), {
        status: 200,
    });
};
