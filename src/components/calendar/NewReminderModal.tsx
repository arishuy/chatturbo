// "use client";
// import React from "react";
// import { Button } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RootModal from "../../components/modals/RootModal";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { TimeField } from "@mui/x-date-pickers/TimeField";
// import dayjs, { Dayjs } from "dayjs";
// import { useSession } from "next-auth/react";
// import { useRef } from "react";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { useRouter } from "next/navigation";

// interface NewReminderModalProps {
//     open: boolean;
//     handleClose: () => void;
//     handleOk: () => void;
// }

// const NewReminderModal = ({ open, handleClose, handleOk} : NewReminderModalProps) => {
//   return (
//     <RootModal
//       title="New reminder"
//       variant="Create"
//       open={open}
//       handleClose={handleClose}
//       handleOk={handleOk}
//       closeOnly={false}
//     >
//       <div>
//         <TextField
//           required
//           id="outlined-required"
//           label="Title"
//           fullWidth
//           onChange={(e: any) => {
//             reminderInfo.current.title = e.target.value;
//           }}
//         />
//         <div className="flex mt-4 ml-2">
//           <Typography>Color</Typography>
//           <Stack direction="row" spacing={1} sx={{ marginLeft: "15px" }}>
//             <div
//               className="bg-red-400 w-6 h-6 rounded-full"
//               onClick={() => {
//                 handleClickColor("red");
//               }}
//             ></div>
//             <div
//               className="bg-orange-400 w-6 h-6 rounded-full"
//               onClick={() => handleClickColor("orange")}
//             ></div>
//             <div
//               className="bg-yellow-400 w-6 h-6 rounded-full"
//               onClick={() => handleClickColor("yellow")}
//             ></div>
//             <div
//               className="bg-green-400 w-6 h-6 rounded-full"
//               onClick={() => handleClickColor("green")}
//             ></div>
//             <div
//               className="bg-cyan-400 w-6 h-6 rounded-full"
//               onClick={() => handleClickColor("cyan")}
//             ></div>
//             <div
//               className="bg-violet-400 w-6 h-6 rounded-full"
//               onClick={() => handleClickColor("violet")}
//             ></div>
//             <div
//               className="bg-pink-400 w-6 h-6 rounded-full"
//               onClick={() => handleClickColor("pink")}
//             ></div>
//           </Stack>
//         </div>
//         <div className="flex mt-4 ml-2 items-center">
//           <Typography sx={{ marginRight: "15px" }}>Date</Typography>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               value={value}
//               onChange={(newValue) => setValue(newValue)}
//             />
//           </LocalizationProvider>
//         </div>
//         <Stack
//           direction="row"
//           spacing={4}
//           sx={{ marginTop: "15px", marginLeft: "7px" }}
//         >
//           <TimePicker
//             label="Start"
//             value={startTimevalue}
//             onChange={(newValue) => setstartTimevalue(newValue)}
//           />
//           <TimePicker
//             label="End"
//             value={endTimevalue}
//             onChange={(newValue) => setendTimevalue(newValue)}
//           />
//         </Stack>
//       </div>
//       <TextField
//         required
//         id="outlined-required"
//         label="Description"
//         fullWidth
//         sx={{ marginTop: "15px", marginLeft: "7px" }}
//         onChange={(e) => {
//           if (reminderInfo.current) {
//             reminderInfo.current.description = e.target.value;
//           }
//         }}
//       />
//     </RootModal>
//   );
// }

// export default NewReminderModal