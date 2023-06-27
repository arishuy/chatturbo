import React from 'react'
import { TextField, InputAdornment, Avatar, Stack } from '@mui/material'
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useSession } from 'next-auth/react';
import { theme } from '../../theme';
import { CldUploadButton } from "next-cloudinary";

interface MessageInputProps {
    groupId: string
}

const MessageInput = ({groupId} : MessageInputProps ) => {
    const { data: session } = useSession();
    const [message, setMessage] = React.useState("");
    const sendMessage = async () => {
      await fetch(`/api/message`, {
        method: "POST",
        body: JSON.stringify({
          sender: session?.user._doc._id,
          recipient: null,
          recipientGroup: groupId,
          content: message,
          parentMessage: null,
          hearts: null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

     const handleUpload = async (result: any) => {
    await fetch(`/api/message`, {
      method: "POST",
      body: JSON.stringify({
        sender: session?.user._doc._id,
        recipient: null,
        recipientGroup: groupId,
        content: result.info.secure_url,
        parentMessage: null,
          hearts: null,
        type: "photo",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
     };

  return (
    <>
      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar
                src={session?.user?._doc.avatar}
                alt="avatar"
                sx={{ width: "30px", height: "30px" }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Stack direction="row" sx={{ display: "flex", gap: "15px" }}>
                <KeyboardVoiceRoundedIcon
                  fontSize="small"
                  sx={{ opacity: "0.6" }}
                />
                <AttachFileRoundedIcon
                  fontSize="small"
                  sx={{ opacity: "0.6" }}
                />

                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleUpload}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                >
                  <ImageOutlinedIcon fontSize="small" sx={{ opacity: "0.6" }} />
                </CldUploadButton>
                <SendRoundedIcon
                  fontSize="small"
                  sx={{ opacity: "0.7" }}
                  color="primary"
                />
              </Stack>
            </InputAdornment>
          ),
        }}
        sx={{
          width: "100%",
          borderRadius: "20px",
          background: theme.palette.background.neutral,
          "& fieldset": { border: "none" },
          "& .MuiInputBase-root": {
            height: "50px",
          },
        }}
        placeholder="Type a message"
        value={message}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
            //reset value in input
            setMessage("");
          }
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
    </>
  );
}

export default MessageInput