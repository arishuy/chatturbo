import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import Message from '@/models/message';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';

export const PUT = async (req) => {
    try
    {
        await connect();
        const session = await getToken({ req, secret: process.env.SECRET });
        if (!session) {
            return new NextResponse(JSON.stringify("Unauthorized"), { status: 401 });
        }
        const body = await req.json();
        const { currentPassword, newPassword } = body;
        const user = await User.findOne({ _id: session.sub });
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return new NextResponse(JSON.stringify("Incorrect password"), { status: 401 });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 5);
        await User.updateOne({ _id: session.sub }, { password: hashedPassword });
        return new NextResponse(JSON.stringify("Success"), { status: 200 });
    }
    catch (err)
    {
        return new NextResponse(JSON.stringify(err.message), { status: 500 });
    }
    
};
