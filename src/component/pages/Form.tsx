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

const TextAreaQuestions = (Questions as Question[]).filter(
  (question: Question) => question.qaFormat === QAFormat.TEXT
);
const CheckBoxQuestions = (Questions as Question[]).filter(
  (question: Question) => question.qaFormat === QAFormat.CHECKBOX
);

export interface Answers {
  [key: `answer${string}`]: string | undefined;
}

const dynamicSchema = Questions.reduce(
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

interface CheckBoxCardInputProps {
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

  const [checkBoxInputState, setCheckBoxInputState] = useState<
    CheckBoxCardInputProps[]
  >(
    Array.from({ length: Questions.length }, (_, index: number) => ({
      checkedState: new Array(Questions[index].options.length).fill(false),
      isChecked: false,
      inputText: '',
    }))
  );

  watch();
  const onSubmit: SubmitHandler<Answers> = textAreaData => {
    const textAreaAnswers = TextAreaQuestions.map((question: Question) => {
      const key = `answer${question.id}` as keyof Answers;
      const answer = key.length > 0 ? textAreaData[key] : null;
      // question.answer?.textArea = answer;
      return question;
    });
    const data = {
      textArea: textAreaData,
      checkBox: checkBoxInputState,
    };
    API.submit(data);
  };

  const handleCheck = useCallback((id: number, checked: boolean) => {
    setCheckBoxInputState(prevState => {
      const newState = [...prevState];
      newState[id] = {
        ...newState[id],
        isChecked: checked,
      };
      return newState;
    });
  }, []);

  const handleCheckedState = useCallback((id: number, index: number) => {
    setCheckBoxInputState(prevState => {
      const newState = [...prevState];
      newState[id] = {
        ...newState[id],
        checkedState: [
          ...newState[id].checkedState.slice(0, index),
          !newState[id].checkedState[index],
          ...newState[id].checkedState.slice(index + 1),
        ],
      };
      return newState;
    });
  }, []);

  const handleTextInput = useCallback((id: number, textInput: string) => {
    setCheckBoxInputState(prevState => {
      const newState = [...prevState];
      newState[id] = {
        ...newState[id],
        inputText: textInput,
      };
      return newState;
    });
  }, []);

  return (
    <div className="max-w-[1280px] w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <NavBar buttonText="回答を保存" />
        <div className="w-full max-w-[1280px] bg-gray-100 pt-10 px-[120px]">
          {(TextAreaQuestions as Question[]).map((question: Question) => (
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
          ))}
          {(CheckBoxQuestions as Question[]).map(
            (question: Question, index: number) => (
              <div key={question.id} className="pb-7">
                <CheckBoxCard
                  questionNumber={question.questionNumber}
                  questionSentence={question.questionSentence}
                  questionTitle={question.questionTitle}
                  id={index}
                  options={question.options}
                  handleCheckedState={handleCheckedState}
                  handleTextInput={handleTextInput}
                  isChecked={checkBoxInputState[index].isChecked}
                  handleCheck={handleCheck}
                />
              </div>
            )
          )}
        </div>
      </form>
    </div>
  );
};
