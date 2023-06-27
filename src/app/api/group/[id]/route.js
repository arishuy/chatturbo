import connect from '@/utils/db';
import Group from '@/models/group';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const GET = async (req, { params }) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
        return new NextResponse('Unauthenticated', { status: 401 });
    }
    const groups = await Group.findById(params.id).populate('members', {
        name: 1,
        surname: 1,
        avatar: 1,
        quote: 1,
    });
    return new NextResponse(JSON.stringify(groups), { status: 200 });
};
