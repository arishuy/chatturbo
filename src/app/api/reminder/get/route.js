export const GET = async (req) => {
  await connect();
  const session = await getToken({ req, secret: process.env.SECRET });
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const myId = session.sub;
  const groups = await Group.find({ members: myId })
    .populate("members", { name: 1, surname: 1, avatar: 1 })
    .populate("latestMessage")
    .sort({ updatedAt: -1 });
  return new NextResponse(JSON.stringify(groups), { status: 200 });
};
