
import connect from '@/utils/db';
import Group from '@/models/group';
import MessagePage from '@/components/chat/MessagePage';

async function getGroupInfo(id) {
  const res = await fetch(`https://www.chatturbo.tech/api/group/${id}`, {
    method: 'GET',
  });
  return res.json();
}
export default async function  Page  ({
  params,
  searchParams,
}) {
  const id = searchParams?.id ? searchParams : params;
  const groupInfo = await getGroupInfo(id['id']);
  return (
    <>
      <title>Message</title>
      <MessagePage groupInfo={groupInfo} id={id['id']} />
    </>
  );
};
