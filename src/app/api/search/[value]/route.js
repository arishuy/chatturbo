import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import Message from '@/models/message';
import LastSeen from '@/models/lastSeen';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const GET = async (req, {params}) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    const searchTerm = params.value;
    // find people with name or surname matching search term and not in friends list, just get id, name, surname, avatar
    const users = await User.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { surname: { $regex: searchTerm, $options: 'i' } },
        ],
        _id: { $nin: [...session._doc.friends, session.sub] },
    }).select('name surname avatar');

    return new NextResponse(JSON.stringify(users), { status: 200 });
};
