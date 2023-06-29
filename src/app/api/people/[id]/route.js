import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import { NextResponse } from 'next/server';

export const GET = async (req, {params}) => {
    await connect();
    const id = params.id;
    const myUser = await User.findById(id);
   
    // get 5 users not in friends list
    const users = await User.find({
        _id: { $nin: [...myUser.friends, id] },
    }).limit(5);
    return new NextResponse(JSON.stringify(users), { status: 200 });
};
