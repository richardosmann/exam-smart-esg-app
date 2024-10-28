import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormValues } from '../pages/Form';

interface CheckBoxProps {
  id: string;
  questionId: string;
  index: number;
  control: Control<FormValues>;
  trigger: (name?: keyof FormValues) => Promise<boolean>;
  errors: FieldErrors<FormValues>;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  questionId,
  index,
  control,
  trigger,
  errors,
}) => {
  return (
    <div className="w-[42px] h-[42px] p-3">
      <Controller
        name={`checkbox${questionId}.${index}`}
        control={control}
        render={({ field }) => {
          return (
            <label className="flex items-center cursor-pointer relative">
              <input
                id={id}
                type="checkbox"
                className="peer h-[18px] w-[18px] cursor-pointer appearance-none border-2 border-gray-400 rounded checked:bg-emerald-700 checked:border-emerald-700 dark:bg-emerald-700 dark:border-emerald-700 transition-all duration-200"
                checked={field.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event.target.checked);
                  trigger(`checkbox${questionId}`);
                }}
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          );
        }}
      />
    </div>
  );
};

export default CheckBox;
