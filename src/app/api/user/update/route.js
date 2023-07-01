import connect from '@/utils/db';
import Group from "@/models/group";
import User from "@/models/user";
import Message from "@/models/message";
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const PUT = async (req) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
        return new NextResponse(JSON.stringify("Unauthorized"), { status: 401 });
    }
    const body = await req.json();
    const { username, email, name, surname, quote } = body;
    await User.findByIdAndUpdate(session.sub, {
        username: username,
        email: email,
        name: name,
        surname: surname,
        quote: quote,
    });
    return new NextResponse(JSON.stringify("Success"), { status: 200 });
};
