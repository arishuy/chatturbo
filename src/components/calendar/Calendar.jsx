"use client"
import React from "react";
import { Calendar } from "antd";
import ReminderCard from "./ReminderCard";
import dayjs from "dayjs";

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const ReminderCld = ({ reminders }) => {
  const getListData = (value) => {
    let listData = [];
    reminders.forEach((reminder) => {
      if (dayjs(reminder.startDateTime).isSame(value, "day")) {
        listData.push(reminder);
      }
    });
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events h-full max-h-full">
        {listData.map((item) => (
          <ReminderCard key={item._id} reminder={item} />
        ))}
      </ul>
    );
  };

  const cellRender = (current,info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default ReminderCld;
