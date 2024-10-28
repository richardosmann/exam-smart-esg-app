import React, { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavBar } from '../moleclues/navBar';
import { TextAreaCard } from '../templates/textAreaCard';
import { CheckBoxCard } from '../templates/checkBoxCard';
import Questions from '../../data/questions1.json';
import { QAFormat, Question } from '../../data/types';
import {
  NO_TEXT_ERROR_MESSAGE,
  MAX_LENGTH_ERROR_MESSAGE,
  MAX_LENGTH,
  NO_CHECK_ERROR_MESSAGE,
} from '../../constants';
import { API } from '../../API';

const CHECKBOX_QUESTIONS = (Questions as Question[]).filter(
  (question: Question) => question.qaFormat === QAFormat.CHECKBOX
);

const dynamicSchema = Questions.reduce(
  (acc, question) => {
    if (question.qaFormat === QAFormat.TEXT) {
      const key = `answer${question.id}` as `answer${string}`;
      acc[key] = z
        .string()
        .min(1, { message: NO_TEXT_ERROR_MESSAGE })
        .max(MAX_LENGTH, `${MAX_LENGTH}${MAX_LENGTH_ERROR_MESSAGE}`);
    } else if (question.qaFormat === QAFormat.CHECKBOX) {
      const key = `checkbox${question.id}` as `checkbox${string}`;
      acc[key] = z.array(z.boolean()).refine(values => values.some(Boolean), {
        message: NO_CHECK_ERROR_MESSAGE,
      });
      const inputkey =
        `checkboxinput${question.id}` as `checkboxinput${string}`;
      acc[inputkey] = z.string();
    }
    return acc;
  },
  {} as Record<`answer${string}` | `checkbox${string}`, z.ZodTypeAny>
);

const schema = z.object(dynamicSchema);

export type FormValues = z.infer<typeof schema>;

const dynamicDefaultValues = Questions.reduce(
  (acc, question) => {
    if (question.qaFormat === QAFormat.TEXT) {
      const key = `answer${question.id}` as `answer${string}`;
      acc[key] = '';
    } else if (question.qaFormat === QAFormat.CHECKBOX) {
      const key = `checkbox${question.id}` as `checkbox${string}`;
      acc[key] = new Array(question.options.length + 1).fill(false);
      const inputkey =
        `checkboxinput${question.id}` as `checkboxinput${string}`;
      acc[inputkey] = '';
    }
    return acc;
  },
  {} as Record<`answer${string}` | `checkbox${string}`, string | boolean[]>
);

export const Form: React.FC = () => {
  const {
    control,
    trigger,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: dynamicDefaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = useCallback(async data => {
    await API.submit(data);
  }, []);

  return (
    <div className="max-w-[1280px] w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <NavBar buttonText="回答を保存" />
        <div className="w-full max-w-[1280px] bg-gray-100 pt-10 px-[120px]">
          {(Questions as Question[]).map((question: Question) => {
            if (question.qaFormat === QAFormat.TEXT)
              return (
                <div key={question.id} className="pb-7">
                  <TextAreaCard
                    questionNumber={question.questionNumber}
                    questionSentence={question.questionSentence}
                    questionTitle={question.questionTitle}
                    questionId={question.id}
                    control={control}
                    trigger={trigger}
                    errors={errors}
                  />
                </div>
              );
            if (question.qaFormat === QAFormat.CHECKBOX)
              return (
                <div key={question.id} className="pb-7">
                  <CheckBoxCard
                    questionNumber={question.questionNumber}
                    questionSentence={question.questionSentence}
                    questionTitle={question.questionTitle}
                    questionId={question.id}
                    control={control}
                    trigger={trigger}
                    errors={errors}
                    options={question.options}
                  />
                </div>
              );
          })}
        </div>
      </form>
    </div>
  );
};
