import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavBar } from '../moleclues/navBar';
import { TextAreaCard } from '../templates/textAreaCard';
import { CheckBoxCard } from '../templates/checkBoxCard';
import Questions from '../../data/questions1.json';
import { QAFormat, Question } from '../../data/types';
import {
  NO_TEXT_ERROR_MESSAGE,
  MAX_LENGTH_ERROR_MESSAGE,
  MAX_LENGTH,
} from '../../constants';
import { API } from '../../API';

const TEXT_QUESTIONS = (Questions as Question[]).filter(
  (question: Question) => question.qaFormat === QAFormat.TEXT
);
const CHECKBOX_QUESTIONS = (Questions as Question[]).filter(
  (question: Question) => question.qaFormat === QAFormat.CHECKBOX
);

export interface Answers {
  [key: `answer${string}`]: string | undefined;
}

export interface CheckBoxAnswers {
  [key: string]: CheckBoxAnswerProps;
}

const dynamicSchema = TEXT_QUESTIONS.reduce(
  (acc, question) => {
    const key = `answer${question.id}` as `answer${string}`;
    acc[key] = yup
      .string()
      .required(NO_TEXT_ERROR_MESSAGE)
      .max(MAX_LENGTH, `${MAX_LENGTH}${MAX_LENGTH_ERROR_MESSAGE}`);
    return acc;
  },
  {} as Record<
    `answer${string}`,
    yup.StringSchema<string | undefined, yup.AnyObject>
  >
);

const schema = yup.object().shape(dynamicSchema);

interface CheckBoxAnswerProps {
  checkedState: boolean[];
  isChecked: boolean;
  inputText: string;
}

export const Form: React.FC = () => {
  const {
    control,
    trigger,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<Answers>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const [checkBoxAnswers, setCheckBoxAnswers] = useState<
    Record<string, CheckBoxAnswerProps>
  >(
    CHECKBOX_QUESTIONS.reduce(
      (box, question) => {
        box[question.id] = {
          checkedState: new Array(question.options.length).fill(false),
          isChecked: false,
          inputText: '',
        };
        return box;
      },
      {} as Record<string, CheckBoxAnswerProps>
    )
  );

  watch();

  const onSubmit: SubmitHandler<Answers> = useCallback(
    async textAreaData => {
      const answers = (Questions as Question[]).map((question: Question) => {
        if (question.qaFormat === QAFormat.TEXT) {
          const key = `answer${question.id}` as keyof Answers;
          question.answer = {
            ...question.answer,
            textArea: textAreaData[key],
          };
        } else if (question.qaFormat === QAFormat.CHECKBOX) {
          const answer = checkBoxAnswers[question.id];
          question.answer = {
            ...question.answer,
            optionState: answer.checkedState,
            inputText: answer.isChecked ? answer.inputText : '',
          };
        }
        return question;
      });
      await API.submit(answers);
    },
    [checkBoxAnswers]
  );

  const updateCheckBoxState = useCallback(
    (id: string, update: Partial<CheckBoxAnswerProps>) => {
      setCheckBoxAnswers(prev => ({
        ...prev,
        [id]: { ...prev[id], ...update },
      }));
    },
    []
  );

  const handleCheck = useCallback(
    (id: string, checked: boolean) => {
      updateCheckBoxState(id, { isChecked: checked });
    },
    [updateCheckBoxState]
  );

  const handleCheckedState = useCallback(
    (id: string, index: number) => {
      updateCheckBoxState(id, {
        checkedState: checkBoxAnswers[id].checkedState.map((state, idx) =>
          idx === index ? !state : state
        ),
      });
    },
    [checkBoxAnswers, updateCheckBoxState]
  );

  const handleTextInput = useCallback(
    (id: string, textInput: string) => {
      updateCheckBoxState(id, { inputText: textInput });
    },
    [updateCheckBoxState]
  );

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
                    control={control}
                    trigger={trigger}
                    errors={errors}
                    index={question.id}
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
                    id={question.id}
                    options={question.options}
                    handleCheckedState={handleCheckedState}
                    handleTextInput={handleTextInput}
                    isChecked={checkBoxAnswers[question.id].isChecked}
                    handleCheck={handleCheck}
                  />
                </div>
              );
          })}
        </div>
      </form>
    </div>
  );
};
