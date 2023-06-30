export default async function getRequestTo(id: string) {
  const res = await fetch(`https://www.chatturbo.tech/api/friend/myrequest/${id}`, {
    method: "GET",
  });
  return res.json();
}
