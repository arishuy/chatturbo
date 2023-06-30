import React from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useRef, useEffect, useState } from "react";
import AvatarUploadTrigger from "./avatar/AvatarUploadTrigger";
import RootModal from "../modals/RootModal"
import AvatarEditor from "./avatar/AvatarEditor";
import { getCroppedImg } from "./avatar/AvatarEditor";
import useResponsive from "@/hooks/useResponsive";
import axios from "axios";
import { useSession } from "next-auth/react";

const UpdateProfile = ({
  userInfo,
  handleOk,
  profileImage,
}) => {
  const { data: session, update: sessionUpdate } = useSession();
  const updatedUserInfo = useRef()
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  const profileImge = useRef(profileImage);
  const imgRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const isMobile = useResponsive("down", "sm");
  const handleUpdateUserInfo = async () => {
    const data = {
      username: updatedUserInfo.current.username,
      email: updatedUserInfo.current.email,
      name: updatedUserInfo.current.name,
      surname: updatedUserInfo.current.surname,
      quote: updatedUserInfo.current.quote,
    };
    const response = await fetch(`/api/user/update`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      sessionUpdate({
        ...session,
        user: {
          ...session.user,
          _doc: {
            ...session.user._doc,
            username: updatedUserInfo.current.username,
            email: updatedUserInfo.current.email,
            name: updatedUserInfo.current.name,
            surname: updatedUserInfo.current.surname,
            quote: updatedUserInfo.current.quote,
          },
        },
      })
      handleOk();
    }
  };
  const onFinishUpload = () => {
    setOpen(false);
  };
  const uploadImage = async () => {
    if (imgRef.current && completedCrop) {
      const img = await getCroppedImg(imgRef.current, completedCrop, "avatar");
       const formData = new FormData();
       formData.append("file", img);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
          // handleGetImage();
        await fetch(`/api/user/image`, {
          method: "POST",
          body: JSON.stringify({
            avatar: response.data.secure_url,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        profileImge.current = response.data.secure_url;
        sessionUpdate({
          ...session,
          user: {
            ...session.user,
            _doc: {
              ...session.user._doc,
              avatar: response.data.secure_url,
            },
          },
        })
        onFinishUpload();
        handleOk();

      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      updatedUserInfo.current = userInfo;
    }
  }, [userInfo]);

  return (
    userInfo && (
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          margin: "auto",
          padding: isMobile ? "0px" : "auto",
        }}
      >
        <RootModal
          title="Crop Image"
          variant="Create"
          open={open}
          handleClose={onFinishUpload}
          handleOk={uploadImage}
          closeOnly={false}
        >
          <AvatarEditor
            sourceImg={file}
            onUploadImage={(uploadImage) => {
              imgRef.current = uploadImage;
            }}
            setCompletedCrop={(completedCrop) => {
              setCompletedCrop(completedCrop);
            }}
          />
        </RootModal>
        <Grid item xs={12} md={4} sx={{ paddingLeft: "0px !important" }}>
          <Card
            sx={{
              borderRadius: "20px",
              height: isMobile ? "350px" : "429px",
              width: "100%",
            }}
          >
            <AvatarUploadTrigger
              profileImage={profileImge.current}
              onNewSelectedFile={(file) => {
                setFile(file);
                setOpen(true);
              }}
            />
          </Card>
        </Grid>
        <Grid
          item
          spacing={3}
          xs={12}
          md={8}
          sx={{
            ...(isMobile && { paddingLeft: "0px !important" }),
          }}
        >
          <Card sx={{ padding: "20px", borderRadius: "20px" }}>
            <Grid
              container
              spacing={2}
              sx={{
                "& .css-n26ql7-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: isMobile ? "16px 16px" : "auto",
                  fontSize: isMobile ? "15px" : "auto",
                },
                "& label": {
                  fontSize: isMobile ? "15.5px" : "auto",
                },
              }}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Username"
                  fullWidth
                  defaultValue={userInfo.username || ""}
                  onChange={(e) => {
                    updatedUserInfo.current.username = e.target.value;
                  }}
                  sx={{ marginBottom: "13px", marginTop: "13px" }}
                />
              </Grid>
              <Grid item xs={isMobile ? 12 : 6}>
                <TextField
                  id="outlined-required"
                  label="Name"
                  fullWidth
                  defaultValue={userInfo?.name || ""}
                  onChange={(e) => {
                    updatedUserInfo.current.name = e.target.value;
                  }}
                  sx={{ marginBottom: "13px" }}
                />
              </Grid>
              <Grid item xs={isMobile ? 12 : 6}>
                <TextField
                  id="outlined-required"
                  label="Surname"
                  fullWidth
                  defaultValue={userInfo?.surname || ""}
                  onChange={(e) => {
                    updatedUserInfo.current.surname = e.target.value;
                  }}
                  sx={{ marginBottom: "13px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  fullWidth
                  defaultValue={userInfo?.email || ""}
                  onChange={(e) => {
                    updatedUserInfo.current.email = e.target.value;
                  }}
                  sx={{ marginBottom: "13px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-required"
                  label="Quote"
                  fullWidth
                  defaultValue={userInfo?.quote || ""}
                  onChange={(e) => {
                    updatedUserInfo.current.quote = e.target.value;
                  }}
                  sx={{ marginBottom: "13px" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 1,
                  }}
                  onClick={handleUpdateUserInfo}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default UpdateProfile;
