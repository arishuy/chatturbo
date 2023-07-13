import React from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Divider,
  ListItem,
  Skeleton,
  Snackbar,
  Alert,
  TextField
} from "@mui/material";
import { useSession } from "next-auth/react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PhotoIcon from '@mui/icons-material/Photo';
import { CldUploadButton } from 'next-cloudinary'
import RootModal from "../modals/RootModal";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddMember from "./AddMember"

export type GroupInfoProps = {
  _id: string;
  name: string;
  avatar: string;
  members: {
    _id: string;
    name: string;
    surname: string;
    avatar: string;
    quote: string;
  }[];
  theme: string;
  createdAt: Date;
  updatedAt: Date;
};
const GroupInfo = ({
  groupInfo,
  isGroup,
  updateData
}: {
  groupInfo: GroupInfoProps;
  isGroup: boolean;
  updateData: any;
}) => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const name = React.useRef<string>("");
  const active = "border-2 border-black transition duration-500 ease-in-out";
  const handleClickColor = async (color: string) => {
    const res = await fetch(`/api/group/${groupInfo._id}/changeTheme`, {
      method: 'PUT',
      body: JSON.stringify({
        theme: color, 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setMessage('Theme changed successfully');
      setOpen(true);
      updateData();
    }
  };
  const handleUpload = async (result: any) => {
    const res = await fetch(`/api/group/${groupInfo._id}/changePhoto`, {
      method: 'PUT',
      body: JSON.stringify({
        avatar: result.info.secure_url,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setMessage('Photo changed successfully');
      setOpen(true);
      updateData();
    }
  }; const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleClose = () => {
    setOpenModal(false);
    setOpenAddModal(false);
  };
  const handleChangeName = async () => {
    const res = await fetch(`/api/group/${groupInfo._id}/changeName`, {
      method: 'PUT',
      body: JSON.stringify({
        name: name.current
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setMessage('Name changed successfully');
      setOpen(true);
      setOpenModal(false);
      updateData();
    }
  }
  const handleAddMember = async () => {
    setMessage('Member added successfully');
    setOpen(true);
    setOpenAddModal(false);
    updateData();
  }
  return (
    <>
      <Box sx={{ padding: "40px 15px" }}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
        >
          <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isGroup ? (
            <>
              <Avatar
                sx={{
                  width: "60px",
                  height: "60px",
                }}
                alt="Remy Sharp"
                src={groupInfo?.avatar}
              />
              <Typography variant="h6">{groupInfo?.name}</Typography>
              <Typography
                sx={{ opacity: "0.5", fontSize: "14px" }}
                variant="h6"
              >
                {groupInfo?.members?.length} members
              </Typography>
              <Stack direction="row" spacing={2} sx={{
                padding: "10px 0px"
              }}>
                <Fab size="small" color="primary" aria-label="add" onClick={
                  () => setOpenAddModal(true)
                }>
                  <AddIcon />
                </Fab>
                <Fab size="small" color="primary" aria-label="edit" onClick={
                  () => setOpenModal(true)
                }>
                  <EditIcon />
                </Fab>
                <Fab size="small" color="primary" aria-label="photo" >
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                  >
                    <PhotoIcon />
                  </CldUploadButton>
                </Fab>
              </Stack>
            </>
          ) : (
            <>
              <Avatar
                sx={{
                  width: "60px",
                  height: "60px",
                }}
                alt="Remy Sharp"
                src={
                  groupInfo?.members?.filter(
                    (member) => member._id !== session?.user?._doc._id
                  )[0]?.avatar
                }
              />
              <Typography variant="h6">
                {groupInfo
                  ? groupInfo?.members?.filter(
                    (member) => member._id !== session?.user?._doc._id
                  )[0]?.name +
                  " " +
                  groupInfo?.members?.filter(
                    (member) => member._id !== session?.user?._doc._id
                  )[0]?.surname
                  : <Skeleton variant="text" width="100px" />}
              </Typography>
              <Typography
                sx={{ opacity: "0.5", fontSize: "14px" }}
                variant="h6"
              >
                {groupInfo
                  ? groupInfo?.members?.filter(
                    (member) => member._id !== session?.user?._doc._id
                  )[0]?.quote
                  : <Skeleton variant="text" width="100px" />}
              </Typography>

            </>
          )}
        </Stack>
      </Box>
      <Divider />
      {isGroup ? (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Members</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {groupInfo?.members?.map((member) => (
                <Stack key={member._id} direction="row" spacing={2} sx={{
                  padding: 1
                }} >
                  <Avatar alt="Remy Sharp" src={member.avatar} />
                  <Typography variant="subtitle1" >{member.name} {member.surname}</Typography>
                </Stack>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Themes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="row" spacing={2} sx={{
                padding: 1
              }} >
                <div
                  className={`${groupInfo?.theme === "linear-gradient(129deg, #e0fce6 0%, #d8fdff 50%, #e7e0ff 100%)" ? active : ""
                    }`}
                  style={{
                    background: "linear-gradient(129deg, #e0fce6 0%, #d8fdff 50%, #e7e0ff 100%)"
                    , width: "50px", height: "50px", borderRadius: "10px"
                  }} onClick={() =>
                    handleClickColor("linear-gradient(129deg, #e0fce6 0%, #d8fdff 50%, #e7e0ff 100%)")
                  }></div>
                <div
                  className={`${groupInfo?.theme === "linear-gradient(203.77deg, #dcd7f7 10%, #edd7dd 60%, #fff7f9 100%)" ? active : ""
                    }`}
                  style={{
                    background: "linear-gradient(203.77deg, #dcd7f7 10%, #edd7dd 60%, #fff7f9 100%)"
                    , width: "50px", height: "50px", borderRadius: "10px"
                  }} onClick={() =>
                    handleClickColor("linear-gradient(203.77deg, #dcd7f7 10%, #edd7dd 60%, #fff7f9 100%)")
                  }></div>
                <div
                  className={`${groupInfo?.theme === "conic-gradient(from 195.47deg at 50% 50%, #ffffff 0%, #c6fff6 12%, #eafffc 24%, #c4e7ff 43%, #d1eeff 60%, #aae4ff 76%, #ffffff 100%)" ? active : ""
                    }`}
                  style={{
                    background: "conic-gradient(from 195.47deg at 50% 50%, #ffffff 0%, #c6fff6 12%, #eafffc 24%, #c4e7ff 43%, #d1eeff 60%, #aae4ff 76%, #ffffff 100%)"
                    , width: "50px", height: "50px", borderRadius: "10px"
                  }} onClick={() =>
                    handleClickColor("conic-gradient(from 195.47deg at 50% 50%, #ffffff 0%, #c6fff6 12%, #eafffc 24%, #c4e7ff 43%, #d1eeff 60%, #aae4ff 76%, #ffffff 100%)")
                  }></div>
                <div
                  className={`${groupInfo?.theme === "repeating-linear-gradient(145.47deg, #bfe4ff 24%, #eaeff2 5%, #ceceff 55.07%, #dfd1f9 77%, #e6e3f5 93%, #eaeff2 100%)" ? active : ""
                    }`}
                  style={{
                    background: "repeating-linear-gradient(145.47deg, #bfe4ff 24%, #eaeff2 5%, #ceceff 55.07%, #dfd1f9 77%, #e6e3f5 93%, #eaeff2 100%)"
                    , width: "50px", height: "50px", borderRadius: "10px"
                  }} onClick={() =>
                    handleClickColor("repeating-linear-gradient(145.47deg, #bfe4ff 24%, #eaeff2 5%, #ceceff 55.07%, #dfd1f9 77%, #e6e3f5 93%, #eaeff2 100%)")
                  }></div>
                <div
                  className={`${groupInfo?.theme === "linear-gradient(69deg, #e5e7eb 0%, #acefe1 30%, #c5e4f9 50%, #b4eee1 70%, #e5e7eb 100%)" ? active : ""
                    }`}
                  style={{
                    background: "linear-gradient(69deg, #e5e7eb 0%, #acefe1 30%, #c5e4f9 50%, #b4eee1 70%, #e5e7eb 100%)"
                    , width: "50px", height: "50px", borderRadius: "10px"
                  }} onClick={() =>
                    handleClickColor("linear-gradient(69deg, #e5e7eb 0%, #acefe1 30%, #c5e4f9 50%, #b4eee1 70%, #e5e7eb 100%)")
                  }></div>
                <div
                  className={`${groupInfo?.theme === "linear-gradient(69deg, #ffc6cd 10%, #fecad0 35%, #f6dfe1 60%, #f6e5df 70%, #f6ecdd 80%, #e5e7eb 100%)" ? active : ""
                    }`}
                  style={{
                    background: "linear-gradient(69deg, #ffc6cd 10%, #fecad0 35%, #f6dfe1 60%, #f6e5df 70%, #f6ecdd 80%, #e5e7eb 100%)"
                    , width: "50px", height: "50px", borderRadius: "10px"
                  }} onClick={() =>
                    handleClickColor("linear-gradient(69deg, #ffc6cd 10%, #fecad0 35%, #f6dfe1 60%, #f6e5df 70%, #f6ecdd 80%, #e5e7eb 100%)")
                  }></div>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </>
      ) : 
      <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">Themes</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={2} sx={{
          padding: 1
        }} >
          <div
            className={`${groupInfo?.theme === "linear-gradient(129deg, #e0fce6 0%, #d8fdff 50%, #e7e0ff 100%)" ? active : ""
              }`}
            style={{
              background: "linear-gradient(129deg, #e0fce6 0%, #d8fdff 50%, #e7e0ff 100%)"
              , width: "50px", height: "50px", borderRadius: "10px"
            }} onClick={() =>
              handleClickColor("linear-gradient(129deg, #e0fce6 0%, #d8fdff 50%, #e7e0ff 100%)")
            }></div>
          <div
            className={`${groupInfo?.theme === "linear-gradient(203.77deg, #dcd7f7 10%, #edd7dd 60%, #fff7f9 100%)" ? active : ""
              }`}
            style={{
              background: "linear-gradient(203.77deg, #dcd7f7 10%, #edd7dd 60%, #fff7f9 100%)"
              , width: "50px", height: "50px", borderRadius: "10px"
            }} onClick={() =>
              handleClickColor("linear-gradient(203.77deg, #dcd7f7 10%, #edd7dd 60%, #fff7f9 100%)")
            }></div>
          <div
            className={`${groupInfo?.theme === "conic-gradient(from 195.47deg at 50% 50%, #ffffff 0%, #c6fff6 12%, #eafffc 24%, #c4e7ff 43%, #d1eeff 60%, #aae4ff 76%, #ffffff 100%)" ? active : ""
              }`}
            style={{
              background: "conic-gradient(from 195.47deg at 50% 50%, #ffffff 0%, #c6fff6 12%, #eafffc 24%, #c4e7ff 43%, #d1eeff 60%, #aae4ff 76%, #ffffff 100%)"
              , width: "50px", height: "50px", borderRadius: "10px"
            }} onClick={() =>
              handleClickColor("conic-gradient(from 195.47deg at 50% 50%, #ffffff 0%, #c6fff6 12%, #eafffc 24%, #c4e7ff 43%, #d1eeff 60%, #aae4ff 76%, #ffffff 100%)")
            }></div>
          <div
            className={`${groupInfo?.theme === "repeating-linear-gradient(145.47deg, #bfe4ff 24%, #eaeff2 5%, #ceceff 55.07%, #dfd1f9 77%, #e6e3f5 93%, #eaeff2 100%)" ? active : ""
              }`}
            style={{
              background: "repeating-linear-gradient(145.47deg, #bfe4ff 24%, #eaeff2 5%, #ceceff 55.07%, #dfd1f9 77%, #e6e3f5 93%, #eaeff2 100%)"
              , width: "50px", height: "50px", borderRadius: "10px"
            }} onClick={() =>
              handleClickColor("repeating-linear-gradient(145.47deg, #bfe4ff 24%, #eaeff2 5%, #ceceff 55.07%, #dfd1f9 77%, #e6e3f5 93%, #eaeff2 100%)")
            }></div>
          <div
            className={`${groupInfo?.theme === "linear-gradient(69deg, #e5e7eb 0%, #acefe1 30%, #c5e4f9 50%, #b4eee1 70%, #e5e7eb 100%)" ? active : ""
              }`}
            style={{
              background: "linear-gradient(69deg, #e5e7eb 0%, #acefe1 30%, #c5e4f9 50%, #b4eee1 70%, #e5e7eb 100%)"
              , width: "50px", height: "50px", borderRadius: "10px"
            }} onClick={() =>
              handleClickColor("linear-gradient(69deg, #e5e7eb 0%, #acefe1 30%, #c5e4f9 50%, #b4eee1 70%, #e5e7eb 100%)")
            }></div>
          <div
            className={`${groupInfo?.theme === "linear-gradient(69deg, #ffc6cd 10%, #fecad0 35%, #f6dfe1 60%, #f6e5df 70%, #f6ecdd 80%, #e5e7eb 100%)" ? active : ""
              }`}
            style={{
              background: "linear-gradient(69deg, #ffc6cd 10%, #fecad0 35%, #f6dfe1 60%, #f6e5df 70%, #f6ecdd 80%, #e5e7eb 100%)"
              , width: "50px", height: "50px", borderRadius: "10px"
            }} onClick={() =>
              handleClickColor("linear-gradient(69deg, #ffc6cd 10%, #fecad0 35%, #f6dfe1 60%, #f6e5df 70%, #f6ecdd 80%, #e5e7eb 100%)")
            }></div>
        </Stack>
      </AccordionDetails>
    </Accordion>}
      {/* <Box>
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Reminders</Typography>
          <Typography sx={{ opacity: "0.5", fontSize: "14px" }}>
            See all
          </Typography>
        </ListItem>
      </Box>
      <Box>
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Shared Media</Typography>
          <Typography sx={{ opacity: "0.5", fontSize: "14px" }}>
            See all
          </Typography>
        </ListItem>
      </Box> */}
      {openAddModal ? <AddMember
        handleClose={handleClose}
        open={openAddModal}
        handleOk={handleAddMember}
        groupInfo={groupInfo}
      /> : null}

      <RootModal
        title="Change group name"
        variant="Edit"
        open={openModal}
        handleClose={handleClose}
        handleOk={handleChangeName}
        closeOnly={false}
      >
        <TextField
          fullWidth
          label="Group name"
          variant="outlined"
          onChange={(e) => {
            name.current = e.target.value;
          }}
        />
      </RootModal>
    </>
  );
};

export default GroupInfo;
