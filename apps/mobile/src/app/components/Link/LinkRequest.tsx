import React, { useState, useEffect } from 'react';
import { useDebounce } from '~/app/hooks/useDebounce';
import { validateGeneratedId, sendLinkRequest } from '~/services/linkService';
import CustomBottomSheetModal from '~/app/components/ui/BottomSheetModal';
import IdValidationForm from './IdValidationForm';
import PseudoForm from './PseudoForm';
import ActionButtons, { LinkStep } from './ActionButtons';

interface LinkRequestProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LinkRequest({
  visible,
  onClose,
  onSuccess,
}: LinkRequestProps) {
  const [step, setStep] = useState<LinkStep>(LinkStep.ENTER_ID);
  const [generatedId, setGeneratedId] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [isPseudoFocused, setIsPseudoFocused] = useState(false);
  const [isValidId, setIsValidId] = useState<boolean | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const debouncedGeneratedId = useDebounce(generatedId, 500);

  useEffect(() => {
    if (debouncedGeneratedId.trim().length > 0 && step === LinkStep.ENTER_ID) {
      validateId(debouncedGeneratedId);
    } else {
      setIsValidId(null);
    }
  }, [debouncedGeneratedId, step]);

  const validateId = async (id: string) => {
    setIsValidating(true);
    try {
      const result = await validateGeneratedId(id);
      setIsValidId(result?.isValid ?? false);
    } catch (error) {
      setIsValidId(false);
      console.error('Error validating ID:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleNextStep = () => {
    if (step === LinkStep.ENTER_ID && isValidId) {
      setStep(LinkStep.ENTER_PSEUDO);
    } else if (step === LinkStep.ENTER_PSEUDO && pseudo.length > 0) {
      sendLinkRequestAction();
    }
  };

  const sendLinkRequestAction = async () => {
    setLoadingRequest(true);
    const result = await sendLinkRequest(generatedId, pseudo);
    setLoadingRequest(false);

    if (result) {
      handleClose();
      onSuccess();
    } else {
      throw new Error('Failed to create link request');
    }
  };

  const handleClose = () => {
    setStep(LinkStep.ENTER_ID);
    setGeneratedId('');
    setPseudo('');
    setIsValidId(null);
    setIsValidating(false);
    setLoadingRequest(false);
    onClose();
  };

  const renderEnterIdStep = () => (
    <>
      <IdValidationForm
        generatedId={generatedId}
        setGeneratedId={setGeneratedId}
        isValidId={isValidId}
        isValidating={isValidating}
      />
      <ActionButtons
        step={LinkStep.ENTER_ID}
        isValidId={isValidId}
        pseudo={pseudo}
        loading={loadingRequest}
        onClose={handleClose}
        onNext={handleNextStep}
      />
    </>
  );

  const renderEnterPseudoStep = () => (
    <>
      <PseudoForm
        pseudo={pseudo}
        setPseudo={setPseudo}
        isPseudoFocused={isPseudoFocused}
        setIsPseudoFocused={setIsPseudoFocused}
      />
      <ActionButtons
        step={LinkStep.ENTER_PSEUDO}
        isValidId={isValidId}
        pseudo={pseudo}
        loading={loadingRequest}
        onClose={handleClose}
        onNext={handleNextStep}
      />
    </>
  );

  return (
    <CustomBottomSheetModal
      visible={visible}
      onClose={handleClose}
      title={step === LinkStep.ENTER_ID ? 'Link to someone' : 'Who to call it?'}
    >
      {step === LinkStep.ENTER_ID
        ? renderEnterIdStep()
        : renderEnterPseudoStep()}
    </CustomBottomSheetModal>
  );
}
