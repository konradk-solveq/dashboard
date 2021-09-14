import { Box, Button, Flex } from 'theme-ui';

import InputForm from '../../../components/forms/inputForm';
import TexareaForm from '../../../components/forms/texareaForm';

interface Props {
    descriptionShort
    setDescriptionShort: () => void;
    descriptionLong
    setDescriptionLong: () => void;
    setNewDescription: () => void;
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

    const heandleDescriptionConcat = () => {
        setNewDescription(`${descriptionShort} ${descriptionLong}`);
    };

    const heandleDescriptionShort = () => {
        setNewDescription(`${descriptionShort}`);
    };

    const heandleDescriptionLong = () => {
        setNewDescription(`${descriptionLong}`);
    };

    return (<>
        <Flex>
            <Box sx={{ width: '90%' }}>
                <InputForm
                    title={'opis krótki'}
                    value={descriptionShort}
                    setValue={(e) => setDescriptionShort(e)}
                    freeze={freeze}
                />
                <TexareaForm
                    title={'opis długi'}
                    value={descriptionLong}
                    setValue={(e) => setDescriptionLong(e)}
                    freeze={freeze}
                />
            </Box>
            <Flex
                sx={{
                    // bg: 'khaki',
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
                    onClick={() => heandleDescriptionConcat()}
                >
                    połącz ze opisy
                </Button>
                <Button
                    className="sys-btn"
                    type="button"
                    sx={{ py: '3px', px: '10px', mb: '5px' }}
                    onClick={() => heandleDescriptionShort()}
                >
                    wybierz krótki
                </Button>
                <Button
                    className="sys-btn"
                    type="button"
                    sx={{ py: '3px', px: '10px' }}
                    onClick={() => heandleDescriptionLong()}
                >
                    wybierz długi
                </Button>
            </Flex>
        </Flex>
    </>)
}

export default Description;