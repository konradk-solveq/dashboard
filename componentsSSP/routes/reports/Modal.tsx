import React, { SetStateAction } from 'react';
import {
    Typography,
    Box,
    Button,
    Modal,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Tooltip,
} from '@mui/material/';
import { format, addDays, subDays } from 'date-fns';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardNewIosIcon from '@mui/icons-material/ArrowForwardIos';
import RouteIcon from '@mui/icons-material/Route';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import config from '../../../helpers/queryConfig';
import getQueryFn from '../../../components/utils/getQueryFn';
import endpoints from '../../../components/utils/apiEndpoints';
import { useQuery } from '@tanstack/react-query';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: '32px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '10px',
};

interface IProps {
    open: boolean;
    handleClose: () => void;
    chosenDate: string;
    setChosenDate: React.Dispatch<SetStateAction<string>>;
    startDate: Date;
    maxEndDate: Date;
}

enum ReportType {
    NUMBER_OF_ROUTES = 'NumberOfRoutes',
    NUMBER_OF_ACCOUNTS = 'NumberOfAccounts',
    NUMBER_OF_ROUTES_PUBLISHED = 'NumberOfRoutesPublished',
}

const names = {
    [ReportType.NUMBER_OF_ROUTES]: `Liczba wszystkich tras`,
    [ReportType.NUMBER_OF_ROUTES_PUBLISHED]: 'Lista tras opublikowanych',
    [ReportType.NUMBER_OF_ACCOUNTS]: 'Liczba kont',
};

const icons = {
    [ReportType.NUMBER_OF_ROUTES]: <RouteIcon fontSize="small" />,
    [ReportType.NUMBER_OF_ROUTES_PUBLISHED]: <CloudUploadIcon fontSize="small" />,
    [ReportType.NUMBER_OF_ACCOUNTS]: <PeopleIcon fontSize="small" />,
};

const ReportModal: React.FC<IProps> = ({ open, handleClose, chosenDate, setChosenDate, startDate, maxEndDate }) => {
    const addADay = (date: string) => format(addDays(new Date(date), 1), 'yyyy-MM-dd');
    const subADay = (date: string) => format(subDays(new Date(date), 1), 'yyyy-MM-dd');

    const disableIfOverChosenDates = new Date(chosenDate) < subDays(maxEndDate, 1);
    const disableIfUnderChosenDates = new Date(chosenDate) > startDate;

    const { data: reports, error: reportsError } = useQuery(
        ['reports', chosenDate],
        () => getQueryFn(`${endpoints.reports}/${chosenDate}`),
        { ...config, enabled: !!chosenDate },
    );
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={style}
                onKeyDown={(e) => {
                    e.key === 'ArrowRight' && disableIfOverChosenDates && setChosenDate((prev) => addADay(prev));
                    e.key === 'ArrowLeft' && disableIfUnderChosenDates && setChosenDate((prev) => subADay(prev));
                }}
            >
                <Button disabled={!disableIfUnderChosenDates} onClick={() => setChosenDate((prev) => subADay(prev))}>
                    <Tooltip title="Klikając na strzałkę, przechodzisz do poprzedniego dnia">
                        <ArrowBackIosNewIcon />
                    </Tooltip>
                </Button>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ position: 'relative' }}>{'Raport z dnia: ' + chosenDate}</Typography>
                        <Tooltip
                            sx={{ position: 'absolute', left: '70px' }}
                            title="Daty można również zmieniać strzałkami klawiatury"
                        >
                            <InfoIcon color="primary" fontSize="small" />
                        </Tooltip>
                    </Box>
                    <Box sx={{ fontSize: '18px', fontFamily: 'inherit', flexGrow: 1 }}>
                        <List>
                            {reports &&
                                reports.length &&
                                reports
                                    .sort((a, b) => a.type.localeCompare(b.type))
                                    .map((report) => (
                                        <ListItem key={report.id}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ backgroundColor: '#2F4858' }}>
                                                    {icons[report.type]}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography sx={{ fontSize: '18px' }}>
                                                        {names[report.type]}:&nbsp;
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '18px' }}>{report.value}</Typography>
                                                </Box>
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                        </List>{' '}
                    </Box>
                </Box>
                <Button disabled={!disableIfOverChosenDates} onClick={() => setChosenDate((prev) => addADay(prev))}>
                    <Tooltip title="Klikając na strzałkę, przechodzisz do następnego dnia">
                        <ArrowForwardNewIosIcon />
                    </Tooltip>
                </Button>
            </Box>
        </Modal>
    );
};

export default ReportModal;
