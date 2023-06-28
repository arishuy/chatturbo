import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const PUT = async (req) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    const body = req.json();
    const user = await User.findByIdAndUpdate(session.sub, {
        $push: {
            username: body.username,
            email: body.email,
            name: body.name,
            surname: body.surname,
            quote: body.quote,
        },
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
};
