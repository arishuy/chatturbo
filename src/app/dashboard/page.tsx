import Dashboard from '@/components/dashboard/Dashboard'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function getRandomPeople(id: string) {
  const res = await fetch(`https://www.chatturbo.tech/api/people/${id}`, {
      method: 'GET',
  });
  return res.json();
}
async function getFriendRequest(id: string) {
  const res = await fetch(`https://www.chatturbo.tech/api/friend/request/${id}`, {
      method: 'GET',
  });
  return res.json();
}
async function getRequestTo(id: string) {
  const res = await fetch(`https://www.chatturbo.tech/api/friend/myrequest/${id}`, {
      method: 'GET',
  });
  return res.json();
}
export default async function Page () {
  const session = await getServerSession(authOptions)
  const randomPeople = await getRandomPeople(session.user._doc._id);
  const friendRequest = await getFriendRequest(session.user._doc._id);
  const requestTo = await getRequestTo(session.user._doc._id);
  return (
    <div style={{
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "1200px",
      paddingTop: "50px", 
  }}>
      <title>Dashboard</title>
     <Dashboard randomPeople={randomPeople} friendRequest={friendRequest} requestTo={requestTo}  />
    </div>
  )
}
