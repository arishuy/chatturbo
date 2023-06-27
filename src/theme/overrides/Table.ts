import { CustomTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Table(theme: CustomTheme) {
	return {
		MuiTableCell: {
			styleOverrides: {
				head: {
					color: theme.palette.text.secondary,
					backgroundColor: theme.palette.background.neutral,
				},
			},
		},
	};
}
