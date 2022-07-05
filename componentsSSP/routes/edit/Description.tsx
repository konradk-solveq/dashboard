import { Box, Button, Container } from '@mui/material/';

import InputForm from '../../../components/forms/InputForm';
import TextareaForm from '../../../components/forms/TextareaForm';

interface Props {
    descriptionShort;
    setDescriptionShort: (value: string) => void;
    descriptionLong;
    setDescriptionLong: (value: string) => void;
    setNewDescription: (value: string) => void;
    freeze: boolean;
}

const Description: React.FC<Props> = ({
    descriptionShort,
    setDescriptionShort,
    descriptionLong,
    setDescriptionLong,
    setNewDescription,
    freeze,
}: Props) => {
    const handleDescriptionConcat = () => {
        setNewDescription(`${descriptionShort} ${descriptionLong}`);
    };

    const handleDescriptionShort = () => {
        setNewDescription(`${descriptionShort}`);
    };

    const handleDescriptionLong = () => {
        setNewDescription(`${descriptionLong}`);
    };

    return (
        <>
            <Container sx={{ display: 'flex' }}>
                <Box sx={{ width: '90%' }}>
                    <InputForm
                        title={'opis krótki'}
                        value={descriptionShort}
                        setValue={(e) => setDescriptionShort(e)}
                        freeze={freeze}
                    />
                    <TextareaForm
                        title={'opis długi'}
                        value={descriptionLong}
                        setValue={(e) => setDescriptionLong(e)}
                        freeze={freeze}
                    />
                </Box>
                <Container
                    sx={{
                        // bg: 'khaki',
                        display: 'flex',
                        pl: '40px',
                        pt: '20px',
                        borderTop: '1px solid #55555544',
                        mt: '5px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: 'max-content',
                    }}
                >
                    <Button
                        className="sys-btn"
                        type="button"
                        sx={{ py: '3px', px: '10px', mb: '5px' }}
                        onClick={() => handleDescriptionConcat()}
                    >
                        połącz ze opisy
                    </Button>
                    <Button
                        className="sys-btn"
                        type="button"
                        sx={{ py: '3px', px: '10px', mb: '5px' }}
                        onClick={() => handleDescriptionShort()}
                    >
                        wybierz krótki
                    </Button>
                    <Button
                        className="sys-btn"
                        type="button"
                        sx={{ py: '3px', px: '10px' }}
                        onClick={() => handleDescriptionLong()}
                    >
                        wybierz długi
                    </Button>
                </Container>
            </Container>
        </>
    );
};

export default Description;
