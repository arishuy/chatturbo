'use client'
import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
//
import React, { PropsWithChildren, ReactNode } from "react";
import SideBar from "./Sidebar";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
	display: "flex",
	minHeight: "100%",
	overflow: "hidden",
	maxHeight: "100vh",
});

const Main = styled("div")(({ theme }) => ({
	flexGrow: 1,
	minHeight: "100%",
	maxHeight: "100vh",
	overflow: "hidden",
	paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

const Layout = ({ children }: PropsWithChildren) => {
	const [open, setOpen] = useState(false);

	const router = useRouter();

	return (
		<StyledRoot>
			<SideBar />
			<Main>
				{children}
			</Main>
		</StyledRoot>
	);
};

export default Layout;
