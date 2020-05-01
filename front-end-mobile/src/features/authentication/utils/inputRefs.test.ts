import { clearInputRefs, addInputRef, goNext } from './inputRefs';
import { TextInputRef } from 'res/components/textInput/TextInput';

describe(`${clearInputRefs.name}`, () => {
  it('should clean all refs', () => {
    // arrange
    const fakeInputRefs: React.MutableRefObject<TextInputRef[]> = {
      current: [],
    };
    const fakeInputRef: TextInputRef = {
      focus: () => { },
      blur: () => { },
      id: () => '',
    };

    fakeInputRefs.current.push(fakeInputRef);
    fakeInputRefs.current.push(fakeInputRef);

    // act
    clearInputRefs(fakeInputRefs);

    // assert
    expect(fakeInputRefs.current.length).toEqual(0);
  });
});

describe(`${addInputRef.name}`, () => {
  it('should add the ref to the end of inputRefs', () => {
    // arrange
    const fakeInputRefs: React.MutableRefObject<TextInputRef[]> = {
      current: [],
    };
    const fakeInputRef1: TextInputRef = {
      focus: () => { },
      blur: () => { },
      id: () => '1',
    };
    const fakeInputRef2: TextInputRef = {
      focus: () => { },
      blur: () => { },
      id: () => '2',
    };

    // act
    addInputRef(fakeInputRefs)(fakeInputRef1);
    addInputRef(fakeInputRefs)(fakeInputRef2);

    // assert
    expect(fakeInputRefs.current.length).toEqual(2);
    expect(fakeInputRefs.current[1].id()).toEqual('2');
  });
});

describe(`${goNext.name}`, () => {
  it('should focus on the next inputRef in the list', () => {
    // arrange
    let isInputRef1Focused = false;
    const fakeInputRef1: TextInputRef = {
      focus: () => { isInputRef1Focused = true; },
      blur: () => { },
      id: () => '1',
    };
    let isInputRef2Focused = false;
    const fakeInputRef2: TextInputRef = {
      focus: () => { isInputRef2Focused = true; },
      blur: () => { },
      id: () => '2',
    };
    const fakeInputRefs: React.MutableRefObject<TextInputRef[]> = {
      current: [fakeInputRef1, fakeInputRef2],
    };

    // act
    goNext(fakeInputRefs, '1')();

    // assert
    expect(isInputRef1Focused).toEqual(false);
    expect(isInputRef2Focused).toEqual(true);
  });

  it('should do nothing if it is the last inputRef in the list', () => {
    // arrange
    let isInputRef1Focused = false;
    const fakeInputRef1: TextInputRef = {
      focus: () => { isInputRef1Focused = true; },
      blur: () => { },
      id: () => '1',
    };
    let isInputRef2Focused = false;
    const fakeInputRef2: TextInputRef = {
      focus: () => { isInputRef2Focused = true; },
      blur: () => { isInputRef2Focused = false; },
      id: () => '2',
    };
    const fakeInputRefs: React.MutableRefObject<TextInputRef[]> = {
      current: [fakeInputRef1, fakeInputRef2],
    };

    // act
    fakeInputRef2.focus();
    goNext(fakeInputRefs, '2')();

    // assert
    expect(isInputRef1Focused).toEqual(false);
    expect(isInputRef2Focused).toEqual(true);
  });
});