import connect from '@/utils/db';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const GET = async (req) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
        return new NextResponse(JSON.stringify("Unauthorized"), { status: 401 });
    }
    const user = await User.findById(session.sub).populate('friends')
    if (!user) {
        return new NextResponse('User not found', { status: 404 });
    }
    return new NextResponse(JSON.stringify(user.friends), {
        status: 200,
    });
};
