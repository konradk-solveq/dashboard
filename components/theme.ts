const heading = {
    fontFamily: 'heading',
    fontWeight: 'heading',
    lineHeight: 'heading',
};

export const dark = {
    breakpoints: ['420px', '800px', '1200px', '1800px'],
    colors: {
        text: '#313131',
        background: '#fff',
        primary: '#E5353A',
        primary2: '#e21e24',
        primary0: '#e84c50',
        secondary: '#e37b1f',
        muted: '#cf0f36',
        gray: '#999',
        darkGray: '#666',
        purple: '#c0f',
    },
    fonts: {
        body: 'din-r, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace',
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
    fontWeights: {
        body: 400,
        heading: 700,
        display: 900,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    textStyles: {
        heading,
        display: {
            variant: 'textStyles.heading',
            fontSize: [5, 6],
            fontWeight: 'display',
            letterSpacing: '-0.03em',
            mt: 3,
        },
    },
    styles: {
        body: {
            p: 0,
            m: 0,
            heading: '100vh',
        },
        Container: {
            p: 0,
        },
        root: {
            fontFamily: 'body',
            lineHeight: 'body',
            fontWeight: 'body',
        },
        h1: {
            variant: 'textStyles.display',
        },
        h2: {
            variant: 'textStyles.heading',
            fontSize: 5,
        },
        h3: {
            variant: 'textStyles.heading',
            fontSize: 4,
        },
        h4: {
            variant: 'textStyles.heading',
            fontSize: 3,
        },
        h5: {
            variant: 'textStyles.heading',
            fontSize: 2,
        },
        h6: {
            variant: 'textStyles.heading',
            fontSize: 1,
        },
        a: {
            color: 'primary',
            textDecoration: 'none',
            '&:hover': {
                color: 'secondary',
            },
        },
        button: {
            cursor: 'pointer',
        },
        pre: {
            variant: 'prism',
            fontFamily: 'monospace',
            fontSize: 1,
            color: 'text',
            bg: 'muted',
            overflow: 'auto',
            code: {
                color: 'inherit',
            },
        },
        code: {
            fontFamily: 'monospace',
            color: 'secondary',
            fontSize: 1,
        },
        inlineCode: {
            fontFamily: 'monospace',
            color: 'secondary',
            bg: 'muted',
        },
        table: {
            width: '100%',
            my: 4,
            borderCollapse: 'separate',
            borderSpacing: 0,
            'th,td': {
                textAlign: 'left',
                py: '4px',
                pr: '4px',
                pl: 0,
                borderColor: 'muted',
                borderBottomStyle: 'solid',
            },
        },
        th: {
            verticalAlign: 'bottom',
            borderBottomWidth: '2px',
        },
        td: {
            verticalAlign: 'top',
            borderBottomWidth: '1px',
        },
        hr: {
            border: 0,
            borderBottom: '1px solid',
            borderColor: 'muted',
        },
        img: {
            maxWidth: '100%',
        },
    },
    prism: {
        '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
            color: 'gray',
        },
        '.comment': {
            fontStyle: 'italic',
        },
        '.property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable':
            {
                color: 'purple',
            },
        '.atrule,.attr-value,.keyword': {
            color: 'primary',
        },
        '.selector,.attr-name,.string,.char,.builtin,.inserted': {
            color: 'secondary',
        },
    },
};

export default dark;

// sx={{display:'grid', gridTemplateColumns:'50px 180px 1fr', mb:'10px'}}

// display:'flex',
