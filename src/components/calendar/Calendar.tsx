"use client"
import React from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import ReminderCard from "./ReminderCard";

import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs from "dayjs";
import { useState } from "react";



const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};
export type ReminderInfoType = {
  _id: any;
  creator: string;
  title: string;
  description: string;
  startDateTime: Date;
  startTime: Date;
  endTime: Date;
  color: string;
  location: string;
  participants: any;
  group: any;
};
interface CalendarProps {
  reminders: ReminderInfoType[];
}
const App: React.FC<CalendarProps> = ({ reminders }) => {
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));
   const onSelect = (newValue: Dayjs) => {
     setValue(newValue);
     setSelectedValue(newValue);
   };

   const onPanelChange = (newValue: Dayjs) => {
     setValue(newValue);
   };
  const getListData = (value: Dayjs) => {
    let listData: ReminderInfoType[] = [];
    reminders.forEach((reminder) => {
      if (dayjs(reminder.startDateTime).isSame(value, "day")) {
        listData.push(reminder);
      }
    });
    return listData || [];
  };
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events h-full max-h-full">
        {listData.map((item) => (
          <ReminderCard key={item._id} reminder={item} />
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default App;
