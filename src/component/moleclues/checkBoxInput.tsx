import React from 'react';
import { Control } from 'react-hook-form';
import CheckBox from '../atoms/checkBox';
import TextInput from '../atoms/textInput';
import { FormValues } from '../pages/Form';
interface CheckBoxInput {
  id: string;
  questionId: string;
  index: number;
  control: Control<FormValues>;
  trigger: (name?: keyof FormValues) => Promise<boolean>;
  optionState: boolean[];
}

export const CheckBoxInput: React.FC<CheckBoxInput> = ({
  id,
  questionId,
  index,
  control,
  trigger,
  optionState,
}) => {
  return (
    <div className="flex">
      <CheckBox
        id={id}
        questionId={questionId}
        index={index}
        control={control}
        trigger={trigger}
      />
      <TextInput
        questionId={questionId}
        placeholder="その他"
        control={control}
        disabled={!optionState.at(-1)}
      />
    </div>
  );
};
