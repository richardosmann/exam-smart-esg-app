import React, { useMemo } from 'react';
import { Controller, Control } from 'react-hook-form';
import classNames from 'classnames';
import { FormValues } from '../pages/Form';

interface TextInputProps {
  questionId: string;
  placeholder: string;
  control: Control<FormValues>;
  disabled: boolean | undefined;
}

const TextInput: React.FC<TextInputProps> = ({
  questionId,
  placeholder,
  control,
  disabled,
}) => {
  const colorClass = useMemo(() => {
    if (disabled) return 'border-b-[1px] border-gray-400';
    return 'border-b border-emerald-700';
  }, [disabled]);

  const textInputClasses = classNames(
    'w-full text-base text-gray-900 bg-transparent focus:outline-none pt-[2px] pb-[3px]',
    `${colorClass}`
  );

  return (
    <div className="w-full max-w-[950px] h-auto min-h-[42px] my-1">
      <Controller
        name={`checkboxinput${questionId}`}
        control={control}
        render={({ field }) => {
          return (
            <input
              {...field}
              type="text"
              className={textInputClasses}
              placeholder={placeholder}
              disabled={disabled}
            />
          );
        }}
      />
    </div>
  );
};

export default TextInput;
