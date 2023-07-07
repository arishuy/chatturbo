"use client";
import React, { useState} from "react";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RootModal from "../../components/modals/RootModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useRouter } from "next/navigation";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";

type ReminderInfoType = {
  title: string;
  description: string;
  startDateTime: Date;
  startTime: Date;
  endTime: Date;
  color: string;
  group: string;
};

interface NewReminderProps {
  groupId: string | null;
}

const NewReminder = ({ groupId }: NewReminderProps) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [open, setOpen] = React.useState(false);
  const [startTimevalue, setstartTimevalue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [endTimevalue, setendTimevalue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const reminderInfo = useRef<any>({
    title: "",
    description: "",
    startDateTime: null,
    startTime: null,
    endTime: null,
    color: "",
    group: groupId,
  });

  const message = "Reminder created successfully";

  const handleClickColor = (color: string) => {
    if (reminderInfo.current) {
      reminderInfo.current.color = color;
    }
    setSelectedColor(color);
  };
  const handleOk = async () => {
    if (reminderInfo.current) {
      reminderInfo.current.startDateTime = value?.toDate() as Date;
      reminderInfo.current.startTime = startTimevalue?.toDate() as Date;
      reminderInfo.current.endTime = endTimevalue?.toDate() as Date;
    }
    const response = await fetch(`/api/reminder/add`, {
      method: "POST",
      body: JSON.stringify({
        title: reminderInfo.current?.title,
        description: reminderInfo.current?.description,
        startDateTime: reminderInfo.current?.startDateTime,
        startTime: reminderInfo.current?.startTime,
        endTime: reminderInfo.current?.endTime,
        color: reminderInfo.current?.color,
        group: reminderInfo.current?.group,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      router.refresh();
      setOpen(false);
      // setOpen(true);
    }
  };
  const active = "border-2 border-black transition duration-500 ease-in-out"
  return (
    <>
      <Button onClick={handleOpen} sx={{ minWidth: "0px" }}>
        <TextSnippetOutlinedIcon fontSize="small" style={{ opacity: "0.7" }} />
      </Button>
      <RootModal
        title="New reminder"
        variant="Create"
        open={open}
        handleClose={handleClose}
        handleOk={handleOk}
        closeOnly={false}
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Title"
            fullWidth
            onChange={(e: any) => {
              reminderInfo.current.title = e.target.value;
            }}
          />
          <div className="flex mt-4 ml-2">
            <Typography>Color</Typography>
            <Stack direction="row" spacing={1} sx={{ marginLeft: "15px" }}>
            <div
        className={`bg-red-400 w-6 h-6 rounded-full cursor-pointer  ${
          selectedColor === 'red' ? active : ''
        }`}
        onClick={() => handleClickColor('red')}
      ></div>
      <div
        className={`bg-orange-400 w-6 h-6 rounded-full cursor-pointer ${
          selectedColor === 'orange' ? active : ''
        }`}
        onClick={() => handleClickColor('orange')}
      ></div>
      <div
        className={`bg-yellow-400 w-6 h-6 rounded-full cursor-pointer ${
          selectedColor === 'gold' ? active : ''
        }`}
        onClick={() => handleClickColor('gold')}
      ></div>
      <div
        className={`bg-green-400 w-6 h-6 rounded-full cursor-pointer ${
          selectedColor === 'green' ? active : ''
        }`}
        onClick={() => handleClickColor('green')}
      ></div>
      <div
        className={`bg-cyan-400 w-6 h-6 rounded-full cursor-pointer ${
          selectedColor === 'blue' ? active : ''
        }`}
        onClick={() => handleClickColor('blue')}
      ></div>
      <div
        className={`bg-violet-400 w-6 h-6 rounded-full cursor-pointer ${
          selectedColor === 'violet' ? active : ''
        }`}
        onClick={() => handleClickColor('violet')}
      ></div>
      <div
        className={`bg-pink-400 w-6 h-6 rounded-full cursor-pointer ${
          selectedColor === 'darksalmon' ? active : ''
        }`}
        onClick={() => handleClickColor('darksalmon')}
      ></div>
            </Stack>
          </div>
          <div className="flex mt-4 ml-2 items-center">
            <Typography sx={{ marginRight: "15px" }}>Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
          </div>
          <Stack
            direction="row"
            spacing={4}
            sx={{ marginTop: "15px", marginLeft: "7px" }}
          >
            <TimePicker
              label="Start"
              value={startTimevalue}
              onChange={(newValue) => setstartTimevalue(newValue)}
            />
            <TimePicker
              label="End"
              value={endTimevalue}
              onChange={(newValue) => setendTimevalue(newValue)}
            />
          </Stack>
        </div>
        <TextField
          required
          id="outlined-required"
          label="Description"
          fullWidth
          sx={{ marginTop: "15px", marginLeft: "7px" }}
          onChange={(e) => {
            if (reminderInfo.current) {
              reminderInfo.current.description = e.target.value;
            }
          }}
        />
      </RootModal>
    </>
  );
};

export default NewReminder;
