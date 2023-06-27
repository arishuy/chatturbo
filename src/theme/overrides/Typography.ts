import { CustomTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Typography(theme: CustomTheme) {
  theme.typography.h4 = {
	  fontSize: "20px",
	  fontWeight: "bold"
	};
	theme.typography.h6 = {
    fontSize: "16px",
    fontWeight: "bold",
  };
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}
