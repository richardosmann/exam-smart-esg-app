import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { TextArea } from '../atoms/textArea';
import { Card } from '../moleclues/card';
import { MAX_LENGTH } from '../../constants';
import { Answers } from '../pages/Form';

interface TextAreaCardProps {
  questionNumber?: string | null;
  questionTitle?: string | null;
  questionSentence: string;
  control: Control<Answers>;
  trigger: (name?: keyof Answers) => Promise<boolean>;
  errors: FieldErrors<Answers>;
  index: string;
}

export const TextAreaCard: React.FC<TextAreaCardProps> = ({
  questionNumber,
  questionTitle,
  questionSentence,
  control,
  trigger,
  errors,
  index,
}) => {
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
        <TextArea
          placeholder="回答を入力してください"
          maxLength={MAX_LENGTH}
          control={control}
          trigger={trigger}
          errors={errors}
          index={index}
        />
      </Card>
    </div>
  );
};