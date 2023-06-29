import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import { NextResponse } from 'next/server';

export const GET = async (req, {params}) => {
    await connect();
    const id = params.id;
    const myUser = await User.findById(id).populate('waitingRequestFriends');
    return new NextResponse(JSON.stringify(myUser.waitingRequestFriends), { status: 200 });
};
