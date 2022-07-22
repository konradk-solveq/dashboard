import { createTheme } from '@mui/material/styles';

const baseProperties = {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontSizeXXS: 12,
    fontSizeXS: 14,
    fontSizeSM: 16,
    fontSizeMD: 20,
    fontSizeLG: 24,
    fontSizeXL: 32,
    fontSize2XL: 48,
    fontSize3XL: 64,
};

const baseHeadingProperties = {
    fontFamily: baseProperties.fontFamily,
    color: 'black',
    fontWeight: baseProperties.fontWeightRegular,
};

export const mdTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 420,
            md: 800,
            lg: 1200,
            xl: 1800,
        },
    },
    palette: {
        primary: {
            main: '#2F4858',
            light: '#E5353A',
            dark: '#E31F26',
        },
        secondary: {
            main: '#E31F26',
        },
    },
    typography: {
        fontFamily: baseProperties.fontFamily,
        fontWeightLight: baseProperties.fontWeightLight,
        fontWeightRegular: baseProperties.fontWeightRegular,
        fontWeightMedium: baseProperties.fontWeightRegular,
        h1: {
            fontSize: 48,
            lineHeight: 1.25,
            ...baseHeadingProperties,
        },

        h2: {
            fontSize: 36,
            lineHeight: 1.3,
            ...baseHeadingProperties,
        },

        h3: {
            fontSize: 30,
            lineHeight: 1.375,
            ...baseHeadingProperties,
        },

        h4: {
            fontSize: 24,
            lineHeight: 1.375,
            fontWeight: baseProperties.fontWeightLight,
            ...baseHeadingProperties,
        },

        h5: {
            fontSize: 20,
            lineHeight: 1.375,
            ...baseHeadingProperties,
        },

        h6: {
            fontSize: 16,
            lineHeight: 1.625,
            fontWeight: baseProperties.fontWeightLight,
            ...baseHeadingProperties,
        },

        subtitle1: {
            fontFamily: baseProperties.fontFamily,
            fontSize: baseProperties.fontSizeXL,
            fontWeight: baseProperties.fontWeightRegular,
            lineHeight: 1.625,
        },

        subtitle2: {
            fontSize: 20,
            lineHeight: 1.375,
            fontWeight: 300,
            ...baseHeadingProperties,
        },

        body1: {
            fontFamily: baseProperties.fontFamily,
            fontSize: baseProperties.fontSizeXL,
            fontWeight: baseProperties.fontWeightRegular,
            lineHeight: 1.625,
        },

        body2: {
            fontFamily: baseProperties.fontFamily,
            fontSize: baseProperties.fontSizeMD,
            fontWeight: baseProperties.fontWeightRegular,
            lineHeight: 1.6,
        },

        button: {
            fontFamily: baseProperties.fontFamily,
            fontSize: baseProperties.fontSizeSM,
            fontWeight: baseProperties.fontWeightRegular,
            lineHeight: 1.5,
            textTransform: 'uppercase',
        },

        caption: {
            fontFamily: baseProperties.fontFamily,
            fontSize: baseProperties.fontSizeXS,
            fontWeight: 300,
            lineHeight: 1.25,
        },

        overline: {
            fontFamily: baseProperties.fontFamily,
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                underline: 'none',
            },
        },
    },
});
