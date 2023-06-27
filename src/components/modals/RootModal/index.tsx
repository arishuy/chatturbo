import {
	Modal,
	Box,
	Checkbox,
	FormControlLabel,
	Typography,
	Button,
	FormControl,
	Input,
	InputLabel,
} from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../../../theme";
import useResponsive from "../../../hooks/useResponsive";
import { Close, Done } from "@mui/icons-material";

type ModalProps = {
	variant: "Create" | "Edit" | "Delete";
	open: boolean;
	handleClose: any;
	handleOk: any;
	children: ReactNode;
	title?: string;
	closeOnly: boolean;
};

const RootModal = ({ title, variant, open, handleClose, handleOk, children, closeOnly }: ModalProps) => {

	const isMobile = useResponsive("down", "sm");

	const colors = {
		Create: theme.palette.primary,
		Edit: theme.palette.info,
		Delete: theme.palette.error,
	} satisfies Record<ModalProps["variant"], {}>;

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: isMobile ? "80vw" : 600,
					bgcolor: "background.paper",
					boxShadow: 24,
					borderRadius: 2,
					p: isMobile ? 3 : 4,
				}}>
				<Typography id="modal-modal-title" variant="h4" component="h2">
					{title ? title : variant}
				</Typography>
				<div className="my-3">{children}</div>
				<div className="flex justify-end mt-6">
					{!closeOnly && (
						<Button
							variant="outlined"
							sx={{
								color: colors[variant].main,
								borderColor: colors[variant].light,
								":hover": { background: colors[variant].lighter, borderColor: colors[variant].main },
							}}
							onClick={handleClose}>
							{isMobile ? <Close sx={{ color: "red" }} /> : "Cancel"}
						</Button>
					)}
					<Button
						variant="contained"
						// className={`ml-3 text-white ${bg[variant]} ${hoverBg[variant]}`}
						sx={{
							ml: 2.5,
							color: "#fff",
							background: `${colors[variant].main} ${!isMobile && "!important"}`,
							":hover": { background: `${colors[variant].dark} !important` },
						}}
						onClick={handleOk}>
						{isMobile ? <Done sx={{ color: "green" }} /> : closeOnly ? "Close" : "OK"}
					</Button>
				</div>
			</Box>
		</Modal>
	);
};

export default RootModal;
