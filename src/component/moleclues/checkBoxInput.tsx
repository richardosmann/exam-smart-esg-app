import React from 'react';
import CheckBox from '../atoms/checkBox';
import TextInput from '../atoms/textInput';

interface CheckBoxInput {
  name: string;
  isChecked: boolean;
  handleCheck: (checked: boolean) => void;
  handleTextInput: (textInput: string) => void;
}

export const CheckBoxInput: React.FC<CheckBoxInput> = ({
  name,
  isChecked,
  handleCheck,
  handleTextInput,
}) => {
  return (
    <div className="flex">
      <CheckBox id={name} name={name} handleCheck={handleCheck} />
      <TextInput
        placeholder="その他"
        handleTextInput={handleTextInput}
        disabled={!isChecked}
      />
    </div>
  );
};
