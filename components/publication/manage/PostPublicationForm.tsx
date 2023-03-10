import React, { useCallback, useContext, useState } from 'react';
import { Typography, CircularProgress, Box, Button, Container } from '@mui/material/';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';

import { Step0, Step1, Step2, Step3, Step4, Submitted } from './steps';
import { PostPublicationContext } from '../../contexts/publication/PostPublication';
import { PublishFormSubmission, PublishFormValues, ActiveSteps, Steps } from '../../typings/PublicationSection';
import { Files } from '../../typings/ManagePublications';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-bottom: 50px;
`;

const PostPublicationForm: React.FC = () => {
    const { publishFormMethods, postPublicationMutation, files } = useContext(PostPublicationContext);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [activeFiles, setActiveFiles] = useState<Files['policy'] | Files['terms']>();

    const queryClient = useQueryClient();

    const {
        handleSubmit,
        trigger,
        setValue,
        reset,
        formState: { errors },
        clearErrors,
    } = publishFormMethods;

    const handlePublicationTypeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        reset();
        const type = (e.target as HTMLButtonElement).value;
        setActiveFiles([...files[type].data].reverse());
        setValue('publicationType', type);
        setActiveStep((prevStep: ActiveSteps) => prevStep + 1);
    };

    const isLoading = () => files.policy.isLoading || files.terms.isLoading || postPublicationMutation.isLoading;

    const steps: Steps = [
        // todo : check why useCallback doesn't trace dependencies required
        <Step0 handlePublicationTypeSelect={handlePublicationTypeSelect} />,
        <Step1 activeFiles={activeFiles} />,
        <Step2 />,
        <Step3 activeFiles={activeFiles} />,
        <Step4 />,
        <Submitted isError={postPublicationMutation.isError} />,
    ];

    const renderStep = useCallback(() => {
        switch (activeStep) {
            case 0:
                return steps[0];
            case 1:
                return steps[1];
            case 2:
                return steps[2];
            case 3:
                return steps[3];
            case 4:
                return steps[4];
            case 5:
                return steps[5];
            default:
                return null;
        }
    }, [activeStep, files]);

    const handleNext = async () => {
        const isStepValid = await trigger();
        if (isStepValid) setActiveStep((prevActiveStep: ActiveSteps) => prevActiveStep + 1);
    };

    const handleBack = () => {
        clearErrors();
        queryClient.invalidateQueries(['files']);
        if (activeStep != steps.length - 1) setActiveStep((prevActiveStep: ActiveSteps) => prevActiveStep - 1);
        else setActiveStep(0);
    };

    const onSubmit = async (data: PublishFormValues) => {
        const hookToUpload: PublishFormSubmission = {
            type: data.publicationType,
            pair: {
                oldDocumentId: data.current,
                newDocumentId: data.next,
            },
            showDate: data.showDate,
            draft: data.draft,
            publicationDate: data.publicationDate,
            fallbackLanguage: data.fallbackLanguage,
        };
        postPublicationMutation.mutate({ data: hookToUpload });
        setActiveStep((prevStep: ActiveSteps) => prevStep + 1);
    };

    if (files.policy.isError || files.terms.isError) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: '80px' }}>
                    Nie uda??o po????czy?? si?? z serwerem
                </Typography>
                <Button
                    variant="contained"
                    sx={{ fontSize: '1rem', bg: 'darkgrey' }}
                    type="button"
                    onClick={handleBack}
                >
                    Cofnij
                </Button>
            </Box>
        );
    }

    return (
        <Container
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80%',
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            {isLoading() ? <CircularProgress sx={{ mb: '80px' }} /> : renderStep()}
            {errors.current && (
                <Typography sx={{ marginBottom: '20px', textAlign: 'center', width: '100%', fontSize: '1.2rem' }}>
                    Dokumenty nie mog?? by?? takie same!
                </Typography>
            )}
            {(errors.publicationDate || errors.showDate) && (
                <Typography sx={{ marginBottom: '20px', textAlign: 'center', width: '100%', fontSize: '1.2rem' }}>
                    {(errors?.publicationDate?.type || errors?.showDate?.type) === 'afterNow' &&
                        'Data nie mo??e by?? w przesz??o??ci.'}
                    {(errors?.publicationDate?.type === 'afterShowDate' ||
                        errors?.showDate?.type === 'beforePublicationDate') &&
                        'Data publikacji obu dokumet??w musi by?? przed dat?? obowi??zywania nowego dokumentu'}
                </Typography>
            )}
            {!isLoading() && activeStep > 0 && activeStep < steps.length - 1 && (
                <ButtonContainer>
                    <Button
                        variant="contained"
                        sx={{ fontSize: '1rem', bg: 'darkgrey' }}
                        type="button"
                        onClick={handleBack}
                    >
                        Cofnij
                    </Button>
                    {activeStep === steps.length - 2 ? (
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ fontSize: '1rem' }}
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Wy??lij
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ fontSize: '1rem' }}
                            type="button"
                            onClick={handleNext}
                        >
                            Dalej
                        </Button>
                    )}
                </ButtonContainer>
            )}
            {!isLoading() && activeStep === steps.length - 1 && (
                <Button variant="contained" type="button" onClick={handleBack}>
                    Wr???? na start
                </Button>
            )}
            {errors.current && (
                <Typography
                    variant="body1"
                    sx={{ margin: '0', textAlign: 'center', width: '100%', fontSize: '1.2rem' }}
                >
                    Dokumenty nie mog?? by?? takie same!
                </Typography>
            )}
            {(errors.publicationDate || errors.showDate) && (
                <Typography
                    variant="body1"
                    sx={{ margin: '0', textAlign: 'center', width: '100%', fontSize: '1.2rem' }}
                >
                    {(errors?.publicationDate?.type || errors?.showDate?.type) === 'afterNow' &&
                        'Data nie mo??e by?? w przesz??o??ci.'}
                    {(errors?.publicationDate?.type === 'afterShowDate' ||
                        errors?.showDate?.type === 'beforePublicationDate') &&
                        'Data publikacji obu dokumet??w musi by?? przed dat?? obowi??zywania nowego dokumentu'}
                </Typography>
            )}
        </Container>
    );
};

export default PostPublicationForm;
