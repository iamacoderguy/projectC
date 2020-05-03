import { TextInputRef } from 'shared/components/textInput/TextInput';
import { contain, clean, findNextIndex } from 'shared/utils/array';

const currentPredicate = (currentId: string | undefined) => (txtInpt: TextInputRef) => txtInpt.id() == currentId;

export const addInputRef = (inputRefs: React.MutableRefObject<TextInputRef[]>) => (ref: TextInputRef | null) => {
  if (ref && !contain(inputRefs.current, currentPredicate(ref.id()))) {
    inputRefs.current.push(ref);
  }
};

export const clearInputRefs = (inputRefs: React.MutableRefObject<TextInputRef[]>) => {
  clean(inputRefs.current);
};

export const goNext = (inputRefs: React.MutableRefObject<TextInputRef[]>, currentId: string) => () => {
  const nextIndex = findNextIndex(inputRefs.current, currentPredicate(currentId));
  if (nextIndex != -1) {
    inputRefs.current[nextIndex].focus();
  }
};