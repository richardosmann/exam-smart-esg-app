import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

interface TextInputProps {
  placeholder: string;
  handleTextInput(textInput: string): void;
  disabled: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  handleTextInput,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleTextInput(event.target.value);
  };

  const colorClass = useMemo(() => {
    if (disabled) return 'border-b-[1px] border-gray-400';
    return 'border-b-2 border-emerald-700';
  }, [disabled]);

  const textInputClasses = classNames(
    'w-full text-base text-gray-900 bg-transparent focus:outline-none pt-[2px] pb-[3px]',
    `${colorClass}`
  );

  return (
    <div className="w-full max-w-[950px] h-auto min-h-[42px] my-1">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className={textInputClasses}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
