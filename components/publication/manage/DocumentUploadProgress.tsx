import React from 'react';
import { Box, Progress, Button } from 'theme-ui';
import { DocumentUploadProgressProps } from '../../typings/PublicationSection';

const DocumentUploadProgress: React.FC<DocumentUploadProgressProps> = ({ message, fields, setIsLoading }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '80%',
            }}
        >
            <Progress value={message?.length / fields?.length} sx={{ color: 'red', marginTop: '50px' }} />
            <Box sx={{ marginX: 'auto', marginTop: '50px', fontSize: '1.5rem', marginBottom: '50px' }}>
                {message && message?.map((item, index) => <p key={index}>{item}</p>)}
            </Box>
            <Button onClick={() => setIsLoading(false)}>Dodaj więcej dokumentów</Button>
        </Box>
    );
};

export default DocumentUploadProgress;
