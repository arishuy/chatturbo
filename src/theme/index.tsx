'use client'
import PropTypes from "prop-types";
import { ReactNode } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
//
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import customShadows from "./customShadows";
import componentsOverride from "./overrides";
import React from "react";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
	children: PropTypes.node,
};

const themeOptions = {
	palette,
	shape: { borderRadius: 6 },
	typography,
	shadows: shadows(),
	customShadows: customShadows(),
};

export const theme = createTheme(themeOptions);
theme.components = componentsOverride(theme);


export default function ThemeProvider({ children }: { children: ReactNode }) {
	return (
		<StyledEngineProvider injectFirst>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles />
				{children}
			</MUIThemeProvider>
		</StyledEngineProvider>
	);
}
