import { alpha, CustomTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Button(theme: CustomTheme) {
	return {
		MuiButton: {
			styleOverrides: {
				root: {
					color: theme.palette.primary.main,
					"&:hover": {
						boxShadow: "none",
					},
				},
				sizeLarge: {
					height: 48,
				},
				contained: {
					color: theme.palette.grey[0],
					backgroundColor: `${theme.palette.primary.dark} !important`,
					boxShadow: theme.customShadows.z4,
					// backgroundColor: theme.palette.grey[400],
					"&:hover": {
						color: theme.palette.grey[0],
						backgroundColor: `${theme.palette.primary.darker} !important`,
					},
				},
				containedInherit: {
					color: theme.palette.grey[800],
					boxShadow: theme.customShadows.z8,
					"&:hover": {
						backgroundColor: theme.palette.grey[400],
					},
				},
				containedPrimary: {
					boxShadow: theme.customShadows.primary,
				},
				containedSecondary: {
					boxShadow: theme.customShadows.secondary,
				},
				outlinedInherit: {
					border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
					"&:hover": {
						backgroundColor: theme.palette.action.hover,
					},
				},
				textInherit: {
					"&:hover": {
						backgroundColor: theme.palette.action.hover,
					},
				},
			},
		},
	};
}
