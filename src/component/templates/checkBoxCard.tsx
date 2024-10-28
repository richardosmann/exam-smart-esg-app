import React from 'react';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { Card } from '../moleclues/card';
import { CheckBoxInput } from '../moleclues/checkBoxInput';
import CheckBox from '../atoms/checkBox';
import { FormValues } from '../pages/Form';

interface CheckBoxCardProps {
  questionNumber?: string | null;
  questionTitle?: string | null;
  questionSentence: string;
  questionId: string;
  control: Control<FormValues>;
  trigger: (name?: keyof FormValues) => Promise<boolean>;
  errors: FieldErrors<FormValues>;
  options: string[];
}

export const CheckBoxCard: React.FC<CheckBoxCardProps> = ({
  questionNumber,
  questionSentence,
  questionTitle,
  questionId,
  control,
  trigger,
  errors,
  options,
}) => {
  const watchedCheckBox = useWatch({ name: `checkbox${questionId}`, control });

  return (
    <div>
      <Card>
        <div className="flex flex-col w-full max-x-[992px] h-auto min-h-[60px] mb-6">
          <div className="font-normal text-xs mb-2 text-gray-400">
            {questionNumber} {questionTitle}
          </div>
          <div className="font-medium text-xl text-gray-500">
            {questionSentence}
          </div>
        </div>
        {(options as string[]).map((option: string, index: number) => {
          const key = `${questionId}${option}`;
          return (
            <div key={option} className="flex">
              <CheckBox
                id={key}
                questionId={questionId}
                index={index}
                control={control}
                trigger={trigger}
              />
              <label htmlFor={key} className="py-[9px] cursor-pointer">
                {option}
              </label>
            </div>
          );
        })}
        <CheckBoxInput
          id={`${questionId}option`}
          questionId={questionId}
          index={options.length}
          control={control}
          trigger={trigger}
          optionState={watchedCheckBox}
        />
        {(errors[`checkbox${questionId}`]?.root?.message as string) && (
          <div className="h-[20px] text-sm mt-[3px] px-[14px] text-red-500">
            {errors[`checkbox${questionId}`]?.root?.message as string}
          </div>
        )}
        {(errors[`checkbox${questionId}`]?.message as string) && (
          <div className="h-[20px] text-sm mt-[3px] px-[14px] text-red-500">
            {errors[`checkbox${questionId}`]?.message as string}
          </div>
        )}
      </Card>
    </div>
  );
};
