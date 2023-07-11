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
    const { members } = body;
    const group = await Group.findById(params.id);
    const lastSeenPromises = members.map((member) => {
        return LastSeen.create({
          user: member,
          message: group.lastMessage,
        });
      });
    
    const lastSeen = await Promise.all(lastSeenPromises);
    const lastSeenIds = lastSeen.map((item) => item._id);
    await Group.findByIdAndUpdate(params.id, {
        $push: { members: { $each: members }, lastSeen: { $each: lastSeenIds } },
    });
    return new NextResponse(JSON.stringify('Add member successfully'), { status: 200 });
};
