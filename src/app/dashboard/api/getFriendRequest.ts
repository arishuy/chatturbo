import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function getFriendRequest() {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `https://www.chatturbo.tech/api/friend/request/${session.user._doc._id}`,
    {
      method: "GET",
    }
  );
  return res.json();
}
