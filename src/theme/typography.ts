// ----------------------------------------------------------------------

export function remToPx(value: string) {
	return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
	return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
	return {
		"@media (min-width:600px)": {
			fontSize: pxToRem(sm),
		},
		"@media (min-width:900px)": {
			fontSize: pxToRem(md),
		},
		"@media (min-width:1200px)": {
			fontSize: pxToRem(lg),
		},
	};
}

export function responsiveFontWeights({ sm, md, lg }: { sm: number; md: number; lg: number }) {
	return {
		"@media (min-width:600px)": {
			fontWeight: sm,
		},
		"@media (min-width:900px)": {
			fontWeight: md,
		},
		"@media (min-width:1200px)": {
			fontWeight: lg,
		},
	};
}

// ----------------------------------------------------------------------

const FONT_PRIMARY = "Poppins, sans-serif"; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

const typography = {
	fontFamily: FONT_PRIMARY,
	fontWeightRegular: 400,
	fontWeightMedium: 600,
	fontWeightBold: 700,
	h1: {
		fontWeight: 800,
		lineHeight: 80 / 64,
		fontSize: pxToRem(40),
		...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
	},
	h2: {
		fontWeight: 700,
		lineHeight: 64 / 48,
		fontSize: pxToRem(32),
		...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
	},
	h3: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(24),
		...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
	},
	h4: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(20),
		...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
	},
	h5: {
		fontWeight: 600,
		lineHeight: 1.5,
		fontSize: pxToRem(16),
		...responsiveFontSizes({ sm: 16, md: 16, lg: 16 }),
	},
	h6: {
		fontWeight: 500,
		lineHeight: 22 / 14,
		fontSize: pxToRem(14),
		...responsiveFontSizes({ sm: 14, md: 14, lg: 14 }),
	},
	subtitle1: {
		...responsiveFontWeights({ sm: 600, md: 500, lg: 400 }),
		lineHeight: 1.5,
		fontSize: pxToRem(14),
	},
	subtitle2: {
		fontWeight: 500,
		lineHeight: 1.25,
		fontSize: pxToRem(12),
		opacity: 0.65,
	},
	body1: {
		lineHeight: 1.5,
		fontSize: pxToRem(16),
	},
	body2: {
		lineHeight: 22 / 14,
		fontSize: pxToRem(14),
	},
	caption: {
		lineHeight: 1.5,
		fontSize: pxToRem(12),
	},
	overline: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(12),
		textTransform: "uppercase",
	},
	button: {
		fontWeight: 700,
		lineHeight: 24 / 14,
		fontSize: pxToRem(14),
		textTransform: "capitalize",
	},
};

export default typography;
