import Dashboard from '@/components/dashboard/Dashboard'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import TopMessage from "@/components/dashboard/TopMessage"
import Reminder from "@/components/dashboard/Reminder"
import FriendRequest from "@/components/dashboard/FriendRequest"
import RequestTo from "@/components/dashboard/RequestTo"
import RandomPeople from "@/components/dashboard/RandomPeople"
import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import Message from '@/models/message';
import { NextResponse } from 'next/server';


 async function getRandomPeople(id: string) {
  await connect();
    const myUser = await User.findById(id);
    // get 5 users not in friends list
    const users = await User.aggregate([
        { $match: { _id: { $nin: [...myUser.friends, id] } } },
        { $sample: { size: 5 } }
    ]);
    return new NextResponse(JSON.stringify(users), { status: 200 });
}
async function getFriendRequest(id: string) {
  await connect();
    const myUser = await User.findById(id).populate('waitingAcceptedFriends');
    return new NextResponse(JSON.stringify(myUser.waitingAcceptedFriends), {
        status: 200,
    });
}
async function getRequestTo(id: string) {
  await connect();
    const myUser = await User.findById(id).populate('waitingRequestFriends');
    return new NextResponse(JSON.stringify(myUser.waitingRequestFriends), { status: 200 });
}



export default async function Page () {
  const session = await getServerSession(authOptions);
    const randomPeople = await getRandomPeople(session.user._doc._id).then(res => res.json());
    const friendRequest = await getFriendRequest(session.user._doc._id).then(res => res.json());
    const requestTo = await getRequestTo(session.user._doc._id).then(res => res.json());
  return (
    <div
      style={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "1200px",
        paddingTop: "50px",
      }}
    >
      <title>Dashboard</title>
      <Dashboard
        TopMessage={<TopMessage />}
        Reminder={<Reminder />}
        RandomPeople={<RandomPeople randomPeople={randomPeople} />}
        FriendRequest={<FriendRequest friendRequest={friendRequest} />}
        RequestTo={<RequestTo requestTo={requestTo} />}
      />
    </div>
  );
}
