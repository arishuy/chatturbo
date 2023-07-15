import { theme } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import React, { use } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useRef, useState } from "react";
import ReminderCard from "./ReminderCard";

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
};
interface CalendarProps {
  groupId: string;
}
const App = ({groupId} : CalendarProps) => {
  const { token } = theme.useToken();
  const [reminderCurrent, setReminderCurrent] = useState<any>(null);
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [reminderSelected, setReminderSelected] = useState<any>(null);

   const getListData = (value: Dayjs) => {
     let listData: any[] = [];
     if (!reminderCurrent) return listData;
     reminderCurrent.forEach((reminder:any) => {
       if (dayjs(reminder.startDateTime).isSame(value, "day")) {
         listData.push(reminder);
       }
     });
     return listData || [];
   };


  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    // height: "180px",
    // overflow: "auto"
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
    if (listData.length === 0) {
      return null;
    }
    return (
          listData.length > 0 &&
            <Badge
              status={"error" as BadgeProps["status"]} style={{position: "absolute",top: "-10px",right: "-2px"}}
            />
    );
  };
  const getAllHighlightedDays = async (groupId: string) => {
    if (groupId) {
      const data = await fetch(`/api/reminder/get/${groupId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      setReminderCurrent(res.reminder);
      const daysToHighlight = res.reminder.map((reminder: any) => {
        //get day of startDateTime in dayjs format
        const day = dayjs(reminder.startDateTime);
        return day;
      });
      return daysToHighlight;
    }
  };

  useEffect(() => {
    getAllHighlightedDays(groupId);
  },[groupId]);

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

 useEffect(() => {
   if (reminderCurrent && reminderCurrent.length > 0) {
     const reminder = reminderCurrent.map((reminder: any) => {
       const day = dayjs(reminder.startDateTime);
       if (day.isSame(value, "day")) {
          return reminder;
        }
     });
     setReminderSelected(reminder);
   }
 }, [reminderCurrent, value]);
  

  return (
    <div>
      <div style={wrapperStyle}>
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          cellRender={cellRender}
          value={value} onSelect={onSelect}
        />
      </div>
      <div style={{paddingTop:"20px"}}>
        {
          reminderSelected && reminderSelected.map((reminder: any) => {
            if (reminder !== undefined) {
              return <ReminderCard key={reminder._id} reminder={reminder} />
            }
          })
        }
      </div>
    </div>
  );
};

export default App;
