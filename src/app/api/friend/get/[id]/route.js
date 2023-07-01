import connect from '@/utils/db';
import Group from "@/models/group";
import User from "@/models/user";
import Message from "@/models/message";
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const GET = async (req, { params }) => {
    await connect();
    const requestID = params.id;
    const user = await User.findById(requestID).populate('friends')
    if (!user) {
        return new NextResponse('User not found', { status: 404 });
    }
    return new NextResponse(JSON.stringify(user.friends), {
        status: 200,
    });
};
