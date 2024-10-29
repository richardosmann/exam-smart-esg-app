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

export type FormValues = z.infer<typeof schema>;

const dynamicSchema = Questions.reduce(
  (acc: Record<string, z.ZodTypeAny>, question) => {
    if (question.qaFormat === QAFormat.TEXT) {
      const key = `answer${question.id}`;
      acc[key] = z
        .string()
        .min(1, { message: NO_TEXT_ERROR_MESSAGE })
        .max(MAX_LENGTH, `${MAX_LENGTH}${MAX_LENGTH_ERROR_MESSAGE}`);
    } else if (question.qaFormat === QAFormat.CHECKBOX) {
      const checkboxKey = `checkbox${question.id}`;
      acc[checkboxKey] = z
        .array(z.boolean())
        .refine(values => values.some(Boolean), {
          message: NO_CHECK_ERROR_MESSAGE,
        });

      const inputKey = `checkboxinput${question.id}`;
      acc[inputKey] = z.string().optional();
    }
    return acc;
  },
  {}
);

const schema = z.object(dynamicSchema).superRefine((data, ctx) => {
  Questions.forEach(question => {
    if (question.qaFormat === QAFormat.CHECKBOX) {
      const checkboxKey = `checkbox${question.id}`;
      const inputKey = `checkboxinput${question.id}`;

      const lastCheckboxValue =
        data[checkboxKey]?.[data[checkboxKey].length - 1];

      if (
        lastCheckboxValue &&
        (!data[inputKey] || data[inputKey].trim() === '')
      ) {
        ctx.addIssue({
          path: [inputKey],
          message: NO_TEXT_ERROR_MESSAGE,
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
});

const dynamicDefaultValues = Questions.reduce(
  (acc: Record<string, string | boolean[]>, question) => {
    if (question.qaFormat === QAFormat.TEXT) {
      const key = `answer${question.id}`;
      acc[key] = '';
    } else if (question.qaFormat === QAFormat.CHECKBOX) {
      const key = `checkbox${question.id}`;
      acc[key] = new Array(question.options.length + 1).fill(false);
      const inputkey = `checkboxinput${question.id}`;
      acc[inputkey] = '';
    }
    return acc;
  },
  {}
);

export const Form: React.FC = () => {
  const {
    control,
    trigger,
    formState: { errors },
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
          {Questions.map(question => (
            <div key={question.id}>
              {question.qaFormat === QAFormat.TEXT && (
                <div className="pb-7">
                  <TextAreaCard
                    question={question as Question}
                    control={control}
                    trigger={trigger}
                    errors={errors}
                  />
                </div>
              )}
              {question.qaFormat === QAFormat.CHECKBOX && (
                <div className="pb-7">
                  <CheckBoxCard
                    question={question as Question}
                    control={control}
                    trigger={trigger}
                    errors={errors}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};
