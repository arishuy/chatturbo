import connect from '@/utils/db';
import Group from '@/models/group';
import Message from '@/models/message';
import User from '@/models/user';
import LastSeen from '@/models/lastSeen';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const PUT = async (req, { params }) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
        return new NextResponse('Unauthenticated', { status: 401 });
    }
    const body = await req.json();
    const { name } = body;
    await Group.findByIdAndUpdate(params.id, { name });
    return new NextResponse(JSON.stringify('Update group name successfully'), { status: 200 });
};
