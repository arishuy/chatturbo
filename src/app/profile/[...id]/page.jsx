import UserBanner from '@/components/profile/UserBanner'
import React from 'react'
async function getUser(id) {
  const response = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: 'GET',
      next: {
        cache: 'no-store'
      }
  });
  return  response.json()
}
export default async function Page ({
  params,
  searchParams,
}) {
  const id = searchParams?.id ? searchParams : params;
  const user = await getUser(id['id']);
  return (
    <div style={{
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "1200px",
      paddingTop: "50px",
    }}>
      <title>Profile</title>
    <UserBanner user={user} />
    </div>
  )
}