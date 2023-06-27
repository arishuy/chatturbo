import { ChangeEvent } from "react";
import styles from "./AvatarUploadTrigger.module.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ListItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useState } from "react"
import { CldUploadButton } from "next-cloudinary";

type Props = {
  onNewSelectedFile: (imageResult: string) => void;
  profileImage: any
};
function AvatarUploadTrigger({ onNewSelectedFile, profileImage }: Props) {
  const [image, setImage] = useState<String>();
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      // on load the reader.result is always an image
      reader.addEventListener("load", () => {
        onNewSelectedFile(reader.result as string);
        setImage(reader.result as string);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "170px",
        height: "170px",
        border: "1px dashed #eae5e5",
        borderRadius: "50%",
      }}
    >
      <Avatar
        sx={{
          position: "absolute",
          left: "5%",
          top: "5%",
          width: "150px",
          height: "150px",
        }}
        variant="circular"
        alt="Remy Sharp"
        src={profileImage}
      />
      <Typography
        sx={{
          fontSize: "12px",
          color: "rgb(145, 158, 171)",
          position: "absolute",
          top: "105%",
        }}
      >
        Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
      </Typography>
      <Box
        sx={{
          position: "relative",
          top: "5%",
          left: "5%",
          overflow: "hidden",
          padding: "5px",
          borderRadius: "50%",
          cursor: "pointer",
          width: "150px !important",
          height: "150px !important",
          opacity: 0,
          "&:hover": {
            backgroundColor: "rgba(22, 28, 36, 0.64)",
            transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            opacity: 1,
          },
        }}
      >
        <label>
          <ListItem
            sx={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -25%)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              onClick={(e) => {
                e.currentTarget.value = "";
              }}
              style={{
                display: "absolute",
                opacity: 0,
                width: "100%",
                height: "100%",
                visibility: "hidden",
              }}
            />
              <AddAPhotoIcon
                fontSize="medium"
                sx={{
                  color: "white",
                  cursor: "pointer",
                }}
              />
            <Typography
              sx={{ color: "white", fontSize: "11px", marginTop: "6px" }}
            >
              Upload photo
            </Typography>
          </ListItem>
        </label>
      </Box>
    </Box>
  );
}
export default AvatarUploadTrigger;
