import connect from '@/utils/db';
import Group from "@/models/group";
import User from "@/models/user";
import Message from "@/models/message";
import { NextResponse } from 'next/server';

export const GET = async (req, {params}) => {
    await connect();
    const id = params.id;
    const myUser = await User.findById(id);
    // get 5 users not in friends list
    const users = await User.aggregate([
        { $match: { _id: { $nin: [...myUser.friends, id] } } },
        { $sample: { size: 5 } }
    ]);
    return new NextResponse(JSON.stringify(users), { status: 200 });
};
