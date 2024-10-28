import React, { useState } from 'react';
import classNames from 'classnames';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Answers } from '../pages/Form';

interface TextAreaProps {
  placeholder: string;
  maxLength: number;
  control: Control<Answers>;
  trigger: (name?: keyof Answers) => Promise<boolean>;
  errors: FieldErrors<Answers>;
  index: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  maxLength,
  control,
  trigger,
  errors,
  index,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    trigger(`answer${index}`);
  };

  const labelColorClass = errors[`answer${index}`]
    ? 'text-red-500'
    : isFocused
      ? 'text-emerald-700'
      : 'text-gray-400';

  const textAreaColorClass = errors[`answer${index}`]
    ? 'border-red-500 focus:ring-red-500'
    : isFocused
      ? 'border-emerald-700 focus:ring-emerald-700'
      : 'border-gray-400 focus:ring-gray-400';

  const charCountColorClass = errors[`answer${index}`]
    ? 'text-red-500'
    : isFocused
      ? 'text-emerald-700'
      : 'text-gray-400';

  const textAreaClasses = classNames(
    'w-full h-[104px] overflow-y-auto px-3 py-4 border rounded resize-none focus:outline-none transition-all focus:h-[263px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500',
    `${textAreaColorClass}`
  );

  const charCountClasses = classNames(
    'h-[20px] text-sm mt-[3px] px-[14px] flex justify-between',
    `${charCountColorClass}`
  );

  return (
    <div className="relative max-w-[992px] w-full min-h-[127px] h-auto">
      <Controller
        name={`answer${index}`}
        control={control}
        render={({ field }) => {
          const labelClasses = classNames(
            'absolute left-3 top-4 bg-white transition-all duration-300 text-base font-normal pointer-events-none',
            {
              'text-sm': field.value || isFocused,
              '-translate-y-7 scale-100': field.value || isFocused,
            },
            `${labelColorClass}`
          );
          const valueLength = field.value?.length || 0;

          return (
            <>
              <textarea
                {...field}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={textAreaClasses}
                placeholder=""
              />
              <label className={labelClasses}>{placeholder}</label>
              <div className={charCountClasses}>
                <div>
                  {errors[`answer${index}`] &&
                    errors[`answer${index}`]?.message}
                </div>
                <div>
                  {valueLength}/{maxLength}文字
                </div>
              </div>
            </>
          );
        }}
      />
    </div>
  );
};
