import Dashboard from '@/components/dashboard/Dashboard'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import TopMessage from "@/components/dashboard/TopMessage"
import Reminder from "@/components/dashboard/Reminder"
import FriendRequest from "@/components/dashboard/FriendRequest"
import RequestTo from "@/components/dashboard/RequestTo"
import RandomPeople from "@/components/dashboard/RandomPeople"
import getRandomPeople from "./api/getRandomPeople"
import getFriendRequest from "./api/getFriendRequest"
import getRequestTo from "./api/getRequestTo"

export default async function Page () {
  const session = await getServerSession(authOptions);
    const randomPeople = await getRandomPeople(session.user._doc._id);
    const friendRequest = await getFriendRequest();
    const requestTo = await getRequestTo(session.user._doc._id);
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
