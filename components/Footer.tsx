import React from 'react';
import { Container } from 'theme-ui';

const Footer: React.FC<{}> = ({ children }) => {
    return (
        <Container
            sx={{
                paddingLeft: 5,
                paddingRight: 5,
            }}
        >
            {children}
        </Container>
    );
};
export default Footer;
