import React from 'react';
import SwitchSelectorRN, {
  ISwitchSelectorProps,
} from 'react-native-switch-selector';
import R from 'shared/res/R';

type SwitchSelectorProps = ISwitchSelectorProps;

const SwitchSelector: React.FC<SwitchSelectorProps> = (props: SwitchSelectorProps) => {
  return (
    <SwitchSelectorRN
      {...props}

      textStyle={R.palette.normal}
      selectedTextStyle={R.palette.normal}

      buttonColor={R.colors.YELLOW}
      borderColor={R.colors.GRAY}
      height={45}
      borderRadius={10}
      valuePadding={3}
      hasPadding
    />
  );
};

export default SwitchSelector;