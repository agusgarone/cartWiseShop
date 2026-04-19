import React from 'react';
import type {ParsedProducts} from '../../../types/ticket';
import {VoiceShoppingListModal} from '../../../features/voice/components/VoiceShoppingListModal';

type Props = {
  visible: boolean;
  onClose: () => void;
  onContinueWithParsed: (parsed: ParsedProducts) => void;
};

export function ProductsAiVoiceModal(props: Props) {
  return <VoiceShoppingListModal i18nPrefix="products" {...props} />;
}
