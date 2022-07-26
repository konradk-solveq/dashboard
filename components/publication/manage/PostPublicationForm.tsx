import React, { useCallback, useContext, useState } from 'react';
import { Typography, CircularProgress, Box, Button, Container } from '@mui/material/';
import styled from '@emotion/styled';

import { errorHandler } from '../../contexts/translation';
import { Step0, Step1, Step2, Step3, Step4, Submitted } from './steps';
import { PostPublicationContext } from '../../contexts/publication/PostPublication';
import { PublishFormSubmission, PublishFormValues, ActiveSteps, Steps } from '../../typings/PublicationSection';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-bottom: 50px;
`;

const PostPublicationForm: React.FC = () => {
    const { publishFormMethods, postPublication, getAvailableFiles } = useContext(PostPublicationContext);
    const [activeStep, setActiveStep] = useState<Number>(0);
    const [isError, setIsError] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const {
        handleSubmit,
        trigger,
        setValue,
        reset,
        formState: { errors },
        clearErrors,
    } = publishFormMethods;

    const handlePublicationTypeSelect = async (e: React.MouseEvent<HTMLButtonElement>) => {
        reset();
        setIsLoading(true);
        try {
            await getAvailableFiles((e.target as HTMLButtonElement).value as 'terms' | 'privacy');
        } catch (error) {
            setIsError(true);
        }
        setValue('publicationType', (e.target as HTMLButtonElement).value);
        setIsLoading(false);
        setActiveStep((prevStep: ActiveSteps) => prevStep + 1);
    };

    const steps: Steps = [
        <Step0 handlePublicationTypeSelect={handlePublicationTypeSelect} />,
        <Step1 />,
        <Step2 />,
        <Step3 />,
        <Step4 />,
        <Submitted isError={isError} />,
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
    }, [activeStep]);

    const handleNext = async () => {
        const isStepValid = await trigger();
        if (isStepValid) setActiveStep((prevActiveStep: ActiveSteps) => prevActiveStep + 1);
    };

    const handleBack = () => {
        clearErrors();
        setIsError(false);
        if (activeStep != steps.length - 1) setActiveStep((prevActiveStep: ActiveSteps) => prevActiveStep - 1);
        else setActiveStep(0);
    };

    const onSubmit = async (data: PublishFormValues) => {
        setIsLoading(true);
        const objToUpload: PublishFormSubmission = {
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
        try {
            const response = await postPublication(objToUpload);
            errorHandler(response);
        } catch (error) {
            setIsError(true);
        }

        setActiveStep((prevStep: ActiveSteps) => prevStep + 1);
        setIsLoading(false);
    };

    if (isError) {
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
                    Nie udało połączyć się z serwerem
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
        <>
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
                {isLoading ? <CircularProgress sx={{ mb: '80px' }} /> : renderStep()}
                {activeStep > 0 && activeStep < steps.length - 1 && (
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
                                Wyślij
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
                {activeStep === steps.length - 1 && (
                    <Button variant="contained" type="button" onClick={handleBack}>
                        Wróć na start
                    </Button>
                )}
            </Container>
            {errors.current && (
                <Typography
                    variant="body1"
                    sx={{ margin: '0', textAlign: 'center', width: '100%', fontSize: '1.2rem' }}
                >
                    Dokumenty nie mogą być takie same!
                </Typography>
            )}
            {(errors.publicationDate || errors.showDate) && (
                <Typography
                    variant="body1"
                    sx={{ margin: '0', textAlign: 'center', width: '100%', fontSize: '1.2rem' }}
                >
                    {(errors?.publicationDate?.type || errors?.showDate?.type) === 'afterNow' &&
                        'Data nie może być w przeszłości.'}
                    {(errors?.publicationDate?.type === 'afterShowDate' ||
                        errors?.showDate?.type === 'beforePublicationDate') &&
                        'Data publikacji obu dokumetów musi być przed datą obowiązywania nowego dokumentu'}
                </Typography>
            )}
        </>
    );
};

export default PostPublicationForm;
