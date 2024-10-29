import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { TextArea } from '../atoms/textArea';
import { Card } from '../moleclues/card';
import { MAX_LENGTH } from '../../constants';
import { FormValues } from '../pages/Form';
import { Question } from '../../data/types';

interface TextAreaCardProps {
  question: Question;
  control: Control<FormValues>;
  trigger: (name?: keyof FormValues) => Promise<boolean>;
  errors: FieldErrors<FormValues>;
}

export const TextAreaCard: React.FC<TextAreaCardProps> = ({
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
        <TextArea
          placeholder="回答を入力してください"
          maxLength={MAX_LENGTH}
          control={control}
          trigger={trigger}
          errors={errors}
          questionId={question.id}
        />
      </Card>
    </div>
  );
};
