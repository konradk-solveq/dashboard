import { Box, Container } from '@mui/material/';

interface Props {
    title: string;
    value: any;
}

const DataField: React.FC<Props> = ({ title, value }) => {
    const checkNoData = (d) => {
        if (typeof d == 'undefined') {
            return <Box sx={{ fontFamily: 'din-b', color: 'primary' }}>-- undefined --</Box>;
        }
        if (d == null) {
            return <Box sx={{ fontFamily: 'din-b', color: 'primary' }}>-- null --</Box>;
        } else {
            return <Box sx={{ fontFamily: 'din-b' }}>{d.toString()}</Box>;
        }
    };

    return (
        <Container sx={{ display: 'flex' }}>
            <Box sx={{ mr: '5px' }}>{title}</Box>
            {checkNoData(value)}
        </Container>
    );
};

export default DataField;
