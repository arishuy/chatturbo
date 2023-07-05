import React from 'react'
import PeopleCard from '@/components/people/PeopleCard'
import PeopleLayout from '@/components/people/PeopleLayout'
import SearchPeople from '@/components/people/SearchPeople'
import connect from '@/utils/db';
import User from '@/models/user';
import Group from '@/models/group';
import Message from '@/models/message';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { NextResponse } from 'next/server';
async function getRandomPeople(id: string) {
  await connect();
    const myUser = await User.findById(id);
    // get 5 users not in friends list
    const users = await User.aggregate([
        { $match: { _id: { $nin: [...myUser.friends, id] } } },
        { $sample: { size: 20 } }
    ]);
    return new NextResponse(JSON.stringify(users), { status: 200 });
}
export default async function Page (){
  const session = await getServerSession(authOptions);
  const randomPeople = await getRandomPeople(session.user._doc._id).then(res => res.json());
  return (
    <div>
        <title> People </title>
        <PeopleLayout 
          PeopleCard={<PeopleCard data={randomPeople} />}
          SearchPeople={<SearchPeople />}
        />
        </div>
  )
}
