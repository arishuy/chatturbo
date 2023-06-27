//
import Card from "./Card";
import Paper from "./Paper";
import Input from "./Input";
import Table from "./Table";
import Button from "./Button";
import ListItemButton from "./ListItemButton";
import Tooltip from "./Tooltip";
import Backdrop from "./Backdrop";
import Typography from "./Typography";
import Autocomplete from "./Autocomplete";
import { CustomTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: CustomTheme) {
	return Object.assign(
		Card(theme),
		Table(theme),
		Input(theme),
		Paper(),
		Button(theme),
		ListItemButton(theme),
		Tooltip(theme),
		Backdrop(theme),
		Typography(theme),
		Autocomplete(theme)
	);
}
