import connect from '@/utils/db';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export const GET = async (req,  { params }) => {
    try {
        await connect();
        const id = params.id
        const users = await User.findById(id)
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err) {
        return new NextResponse('User not found', { status: 404 });
    }
};
