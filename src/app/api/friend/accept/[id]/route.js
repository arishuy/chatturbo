import connect from "@/utils/db";
import User from "@/models/user";
import Group from "@/models/group";
import LastSeen from '@/models/lastSeen';
import Message from "@/models/message";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const POST = async (req, {params}) => {
    const session = await getToken({ req, secret: process.env.SECRET });
        await connect();
        const myID = session.sub;
        const requestID = params.id;
        const users = await User.findById(requestID);
        if (!users) {
            return new NextResponse('User not found', { status: 404 });
        }
        await User.findByIdAndUpdate(requestID, {
            $push: { friends: myID },
        });
        await User.findByIdAndUpdate(requestID, {
            $pull: { waitingRequestFriends: myID },
        });
        await User.findByIdAndUpdate(myID, {
            $push: { friends: requestID },
        });
        await User.findByIdAndUpdate(myID, {
            $pull: {  waitingAcceptedFriends: requestID },
        });
        // Add group
        const group = await Group.create({
            name: 'Group chat',
            members: [myID, requestID],
        });
        const newMessage = await Message.create({
            sender: myID,
            recipient: requestID,
            recipientGroup: group._id,
            content: 'Now you can chat with your friend!',
        });
        const members = [myID, requestID];
        const lastSeenPromises = members.map((member) => {
            return LastSeen.create({
              user: member,
              message: newMessage._id,
            });
          });
          const lastSeen = await Promise.all(lastSeenPromises);
          await Group.findByIdAndUpdate(group._id, {
            latestMessage: newMessage._id,
            lastSeen: lastSeen.map((seen) => seen._id),
          });
        return new NextResponse('Accept Successfully', { status: 200 });
};
