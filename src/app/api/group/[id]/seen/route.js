import connect from '@/utils/db';
import Group from '@/models/group';
import Message from '@/models/message';
import User from '@/models/user';
import LastSeen from '@/models/lastSeen';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { pusherServer } from '@/libs/pusher';

export const POST = async (req, { params }) => {
    await connect();
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) {
        return new NextResponse('Unauthenticated', { status: 401 });
    }
    const group = await Group.findById(params.id)
        .populate('members', { name: 1, surname: 1, avatar: 1 })
        .populate('latestMessage')
        .populate('lastSeen');
    if (group.latestMessage.seenBy.includes(session.sub)) {
        return new NextResponse(JSON.stringify('Already seen'), {
            status: 200,
        });
    }
    // find id lastSeen have my id
    const lastSeen = group.lastSeen.find((seen) => seen.user == session.sub);
    const beforeSeen = await Message.findByIdAndUpdate(lastSeen.message, {
        $pull: { seenBy: session.sub },
    },
    { new: true }).populate('sender', { name: 1, surname: 1, avatar: 1 })
    .populate('seenBy', { name: 1, surname: 1, avatar: 1 })
    .lean();
    // update lastSeen
    await LastSeen.findByIdAndUpdate(lastSeen._id, {
        message: group.latestMessage._id,
    });
    const updatedMessage = await Message.findByIdAndUpdate(
        group.latestMessage._id,
        {
            $push: { seenBy: session.sub },
        },
        { new: true }
    )
        .populate('sender', { name: 1, surname: 1, avatar: 1 })
        .populate('seenBy', { name: 1, surname: 1, avatar: 1 })
        .lean();

    // Update group
    const newgroup = await Group.findByIdAndUpdate(params.id, {
        latestMessage: updatedMessage,
    })
        .populate('members', { name: 1, surname: 1, avatar: 1 })
        .populate('latestMessage');
    await pusherServer.trigger(session.sub, 'group:update', newgroup);
    // Update last message seen
    await pusherServer.trigger(params.id, 'messages:update', {updatedMessage, beforeSeen});
    return new NextResponse(JSON.stringify(updatedMessage), { status: 200 });
};
