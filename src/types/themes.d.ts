import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface CustomTheme extends Theme {
		palette: any;
		shape: { borderRadius: number };
		typography: any;
		shadows: any;
		customShadows: any;
	}
	// allow configuration using `createTheme`
	interface CustomThemeOptions extends ThemeOptions {
		palette?: any;
		shape?: { borderRadius?: number };
		typography?: any;
		shadows?: any;
		customShadows?: any;
	}
	export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
