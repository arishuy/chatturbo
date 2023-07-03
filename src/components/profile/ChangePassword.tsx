import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText, Grid, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useRef } from "react";
import useResponsive from "@/hooks/useResponsive";
type ShowPasswordState = {
  [key: string]: boolean;
};

const UserChangePassword = () => {
  const isMobile = useResponsive("down", "sm");
  const [showPassword, setShowPassword] = React.useState<ShowPasswordState>({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [error, setError] = React.useState<String>("");
  const [oldPasswordError, setOldPasswordError] = React.useState<String>("");
  const [newPasswordError, setNewPasswordError] = React.useState<String>("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const passwordUpdate = useRef({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleClickShowPassword = (passwordKey: string) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [passwordKey]: !prevState[passwordKey],
    }));
  };
  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordUpdate = async () => {
    if (
      passwordUpdate.current.newPassword !==
      passwordUpdate.current.confirmNewPassword
    ) {
      setError("New password and confirm password must be the same");
      return;
    } 
    const data = {
      currentPassword: passwordUpdate.current.oldPassword,
      newPassword: passwordUpdate.current.newPassword,
    };

    const response = await fetch(`/api/user/password/change`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      setMessage("Password changed successfully");
      setOpen(true);
    } else {
      setOldPasswordError("Old password is incorrect");
    }
  };
  return (
    <Card
      sx={{
        padding: isMobile ? "7px 10px 15px 10px" : "20px",
        borderRadius: "20px",
        width: "95%",
        margin: "auto",
      }}
    >
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
      <Grid
        container
        rowSpacing={4}
        sx={{
          width: "100%",
          margin: "auto",
          padding: isMobile ? "6px 8px !important" : "24px 8px !important",
        }}
      >
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            required={!oldPasswordError}
            error={oldPasswordError != ""}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Old Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword.oldPassword ? "text" : "password"}
              defaultValue={passwordUpdate.current.oldPassword}
              onChange={(e) => {
                passwordUpdate.current.oldPassword = e.target.value;
              }}
              onFocus={(e) => {
                setOldPasswordError("");
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("oldPassword")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword.oldPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
            />
            <FormHelperText id="outlined-weight-helper-text">
              {oldPasswordError}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            required={!newPasswordError}
            error={newPasswordError != ""}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword.newPassword ? "text" : "password"}
              defaultValue={passwordUpdate.current.newPassword}
              onChange={(e) => {
                passwordUpdate.current.newPassword = e.target.value;
              }}
              onFocus={(e) => {
                setNewPasswordError("");
              }}  
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("newPassword")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword.newPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
            <FormHelperText id="outlined-weight-helper-text">
              {newPasswordError}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            required={!error}
            error={error != ""}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword.confirmNewPassword ? "text" : "password"}
              defaultValue={passwordUpdate.current.confirmNewPassword}
              onChange={(e) => {
                passwordUpdate.current.confirmNewPassword = e.target.value;
              }}
              onFocus={(e) => {
                setError("");
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      handleClickShowPassword("confirmNewPassword")
                    }
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword.confirmNewPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm New Password"
            />
            <FormHelperText id="outlined-weight-helper-text">
              {error}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: 1,
            }}
            onClick={handlePasswordUpdate}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserChangePassword;
