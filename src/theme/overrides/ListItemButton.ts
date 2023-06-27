import { alpha, CustomTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function ListItemButton(theme: CustomTheme) {
	return {
		MuiListItemButton: {
			styleOverrides: {
				root: {
					color: theme.palette.text.primary,
					paddingTop: "10px",
					paddingBottom: "10px",
					"&.Mui-selected": {
						color: theme.palette.secondary.dark,
						backgroundColor: theme.palette.grey[300],
						"&:hover": {
							backgroundColor: theme.palette.secondary.lighter,
						},
						"& .MuiListItemIcon-root": {
							color: theme.palette.secondary.dark,
						},
					},
					"&:hover": {
						backgroundColor: theme.palette.secondary.lighter,
						color: theme.palette.secondary.dark,
						"& .MuiListItemIcon-root": {
							color: theme.palette.secondary.dark,
						},
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: theme.palette.text.primary,
					minWidth: "36px",
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				primary: {
					color: theme.palette.text.primary,
				},
			},
		},
	};
}
