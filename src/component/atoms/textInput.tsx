import React, { useEffect } from 'react';
import { Controller, Control, FieldErrors, useWatch } from 'react-hook-form';
import classNames from 'classnames';
import { FormValues } from '../pages/Form';

interface TextInputProps {
  questionId: string;
  placeholder: string;
  control: Control<FormValues>;
  trigger: (name?: keyof FormValues) => Promise<boolean>;
  errors: FieldErrors<FormValues>;
  index: number;
}

const TextInput: React.FC<TextInputProps> = ({
  questionId,
  placeholder,
  control,
  trigger,
  errors,
  index,
}) => {
  const watchedCheckBox = useWatch({ name: `checkbox${questionId}`, control });

  useEffect(() => {
    if (watchedCheckBox && !watchedCheckBox[index]) {
      trigger(`checkboxinput${questionId}`);
    }
  }, [index, questionId, trigger, watchedCheckBox]);

  return (
    <div className="w-full max-w-[950px] h-auto min-h-[42px] my-1">
      <Controller
        name={`checkboxinput${questionId}`}
        control={control}
        render={({ field }) => {
          const colorClass = () => {
            if (watchedCheckBox && !watchedCheckBox[index])
              return 'border-b-[1px] border-gray-400';
            if (errors[`checkboxinput${questionId}`])
              return 'border-b border-red-500';
            return 'border-b border-emerald-700';
          };
          const textInputClasses = classNames(
            'w-full text-base text-gray-900 bg-transparent focus:outline-none pt-[2px] pb-[3px]',
            `${colorClass()}`
          );

          return (
            <input
              {...field}
              type="text"
              className={textInputClasses}
              placeholder={placeholder}
              disabled={!watchedCheckBox[index]}
            />
          );
        }}
      />
      {errors[`checkboxinput${questionId}`]?.message && (
        <div className="h-[20px] text-sm mt-[3px] text-red-500">
          {errors[`checkboxinput${questionId}`]?.message?.toString()}
        </div>
      )}
    </div>
  );
};

export default TextInput;
