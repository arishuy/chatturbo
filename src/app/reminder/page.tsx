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
import { ReminderInfoType } from "../../components/calendar/Calendar";

async function getReminders(id: any) {
  try {
    await connect();
    const myGroupIds = await Group.find({ members: { $in: [id] } });
    const myReminders = await Reminder.find({
      $or: [{ creator: id }, { group: { $in: myGroupIds } }],
    })
      .populate("participants", {avatar: 1}).exec();
    return new NextResponse(JSON.stringify(myReminders), { status: 200 });
  }
  catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
export default async function Page() {
  const session = await getServerSession(authOptions);
  const id = session.user.sub;
  const myReminders = (await getReminders(id).then((res) =>
    res.json()
  )) as ReminderInfoType[];
  return (
    <div
      style={{
        maxHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <title> Reminder </title>
      <div>
        <NewReminder groupId={""} />
      </div>
      <div>
        <Calendar reminders={myReminders} />
      </div>
    </div>
  );
}
