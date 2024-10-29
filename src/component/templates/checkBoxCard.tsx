import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Card } from '../moleclues/card';
import { CheckBoxInput } from '../moleclues/checkBoxInput';
import CheckBox from '../atoms/checkBox';
import { FormValues } from '../pages/Form';
import { Question } from '../../data/types';

interface CheckBoxCardProps {
  question: Question;
  control: Control<FormValues>;
  trigger: (name?: keyof FormValues) => Promise<boolean>;
  errors: FieldErrors<FormValues>;
}

export const CheckBoxCard: React.FC<CheckBoxCardProps> = ({
  question,
  control,
  trigger,
  errors,
}) => {
  return (
    <div>
      <Card>
        <div className="flex flex-col w-full max-x-[992px] h-auto min-h-[60px] mb-6">
          <div className="font-normal text-xs mb-2 text-gray-400">
            {question.questionNumber} {question.questionTitle}
          </div>
          <div className="font-medium text-xl text-gray-500">
            {question.questionSentence}
          </div>
        </div>
        {question.options.map((option, index: number) => {
          const key = `${question.id}${option}`;
          return (
            <div key={option} className="flex">
              <CheckBox
                id={key}
                questionId={question.id}
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
          id={`${question.id}option`}
          questionId={question.id}
          index={question.options.length}
          control={control}
          trigger={trigger}
          errors={errors}
        />
        {errors[`checkbox${question.id}`]?.root?.message ? (
          <div className="h-[20px] text-sm mt-[3px] px-[14px] text-red-500">
            {errors[`checkbox${question.id}`]?.root?.message?.toString()}
          </div>
        ) : (
          errors[`checkbox${question.id}`]?.message && (
            <div className="h-[20px] text-sm mt-[3px] px-[14px] text-red-500">
              {errors[`checkbox${question.id}`]?.message?.toString()}
            </div>
          )
        )}
      </Card>
    </div>
  );
};
