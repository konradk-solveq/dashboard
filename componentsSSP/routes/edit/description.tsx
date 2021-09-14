import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { AspectImage, Box, Button, Flex } from 'theme-ui';

import { getData, getDistance, getTime } from '../../../helpers/dataFormat';
import fetcher from '../../../helpers/fetcher';
import ApiContext from '../../../components/contexts/api';
import EventsContext from '../../../components/contexts/api/EventsContext';
import ManageContext from '../../../components/contexts/api/ManageContext';
import RouteNavigationContext from '../../../components/contexts/route/RouteNavigationContext';
import CheckboxList from '../../../components/forms/checkboxList';
import InputForm from '../../../components/forms/inputForm';
import SwitchForm from '../../../components/forms/swithForm';
import TexareaForm from '../../../components/forms/texareaForm';
import RouteNavigationButtons from './navButtons';

import type { Route } from '../../../components/typings/Route';
import DataField from '../../../components/forms/dataField';
interface Props {
    descriptionShort
    setDescriptionShort: () => void;
    descriptionLong
    setDescriptionLong: () => void;
    setNewDescription: () => void;
}

const Description: React.FC<Props> = ({
    descriptionShort,
    setDescriptionShort,
    descriptionLong,
    setDescriptionLong,
    setNewDescription
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
                />
                <TexareaForm
                    title={'opis długi'}
                    value={descriptionLong}
                    setValue={(e) => setDescriptionLong(e)}
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