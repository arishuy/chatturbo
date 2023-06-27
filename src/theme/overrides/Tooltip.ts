import { CustomTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Tooltip(theme : CustomTheme) {
	return {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: theme.palette.grey[800],
				},
				arrow: {
					color: theme.palette.grey[800],
				},
			},
		},
	};
}
