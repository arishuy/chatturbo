import Calendar from "../../components/calendar/Calendar";
import NewReminder from "../../components/calendar/NewReminder";
import connect from "@/utils/db";
import User from "@/models/user";
import Group from "@/models/group";
import Message from "@/models/message";
import Reminder from "@/models/reminder";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { ReminderInfoType }  from "../../components/calendar/Calendar";

async function getReminders(id: any) {
  await connect();
  const myGroupIds = await Group.find({ members: { $in: [id] } });
  const myReminders = await Reminder.find({
    $or: [{ creator: id }, { group: { $in: myGroupIds } }],
  })
  return new NextResponse(JSON.stringify(myReminders), { status: 200 });
}
export default async function Page() {
    const session = await getServerSession(authOptions);
  const id = session.user.sub;
  const myReminders = (await getReminders(id).then((res) =>
    res.json()
  )) as ReminderInfoType[];
  return (
    <div>
      <title> Reminder </title>
      <div>
        <NewReminder groupId={""}/>
      </div>
      <div>
        <Calendar reminders={myReminders} />
      </div>
    </div>
  );
}
