import React from 'react';
import { Box, Spinner, Button } from 'theme-ui';
import { DocumentUploadProgressProps } from '../../typings/PublicationSection';

const DocumentUploadProgress: React.FC<DocumentUploadProgressProps> = ({ message, setIsLoading }) => {
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
            {message ? (
                <>
                    <Box sx={{ marginX: 'auto', marginTop: '50px', fontSize: '1.5rem', marginBottom: '50px' }}>
                        {message}
                    </Box>
                    <Button onClick={() => setIsLoading(false)}>Dodaj więcej dokumentów</Button>
                </>
            ) : (
                <Spinner mt="80px" />
            )}
        </Box>
    );
};

export default DocumentUploadProgress;
