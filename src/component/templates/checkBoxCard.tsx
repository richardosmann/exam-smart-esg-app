import React from 'react';
import { Card } from '../moleclues/card';
import { CheckBoxInput } from '../moleclues/checkBoxInput';
import CheckBox from '../atoms/checkBox';

interface CheckBoxCardProps {
  questionNumber?: string | null;
  questionTitle?: string | null;
  questionSentence: string;
  id: number;
  options: string[];
  handleCheckedState: (id: number, index: number) => void;
  handleTextInput: (id: number, textInuput: string) => void;
  isChecked: boolean;
  handleCheck: (id: number, checked: boolean) => void;
}

export const CheckBoxCard: React.FC<CheckBoxCardProps> = ({
  questionNumber,
  questionSentence,
  questionTitle,
  id,
  options,
  handleCheckedState,
  handleTextInput,
  isChecked,
  handleCheck,
}) => {
  const handleChangeCheck = (checked: boolean) => {
    handleCheck(id, checked);
  };

  const handleChangeTextInput = (textInput: string) => {
    handleTextInput(id, textInput);
  };

  return (
    <div>
      <Card>
        <div className="flex flex-col w-full max-x-[992px] h-auto min-h-[60px] my-6">
          <div className="font-normal text-xs mb-2 text-gray-400">
            {questionNumber} {questionTitle}
          </div>
          <div className="font-medium text-xl text-gray-500">
            {questionSentence}
          </div>
        </div>
        {(options as string[]).map((option: string, index: number) => {
          const checkBoxKey = `${questionNumber}_${option}`;
          return (
            <div key={option} className="flex">
              <CheckBox
                id={checkBoxKey}
                name={option}
                value={option}
                handleCheck={() => handleCheckedState(id, index)}
              />
              <label htmlFor={checkBoxKey} className="py-[9px] cursor-pointer">
                {option}
              </label>
            </div>
          );
        })}
        <CheckBoxInput
          name=""
          value=""
          isChecked={isChecked}
          handleCheck={handleChangeCheck}
          handleTextInput={handleChangeTextInput}
        />
      </Card>
    </div>
  );
};