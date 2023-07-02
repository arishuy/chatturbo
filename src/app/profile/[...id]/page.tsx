import UserBanner from '@/components/profile/UserBanner'
import React from 'react'
import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import Message from '@/models/message';
import { NextResponse } from 'next/server';

async function getUser (id: string) {
        await connect();
        const users = await User.findById(id).populate('friends')
        return new NextResponse(JSON.stringify(users), { status: 200 });
};

export default async function Page ({
  params,
  searchParams,
}:{
  params: any,
  searchParams: any,
}) {
  const id = searchParams?.id ? searchParams : params;
  const user = await getUser(id['id']).then(res => res.json())
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