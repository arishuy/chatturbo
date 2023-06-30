export default async function getRandomPeople(id: string) {
  const res = await fetch(`https://www.chatturbo.tech/api/people/${id}`, {
    method: "GET",
  });
  return res.json();
}
