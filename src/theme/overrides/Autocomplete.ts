import { CustomTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Autocomplete(theme: CustomTheme) {
	return {
		MuiAutocomplete: {
			styleOverrides: {
				paper: {
					boxShadow: theme.customShadows.z20,
				},
			},
		},
	};
}
