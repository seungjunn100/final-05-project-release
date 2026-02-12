'use client';
import { useEffect, useRef, useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Dropdown({ options, value, onChange, placeholder = '선택하기', className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const displayValue = options.find(opt => opt.value === value)?.label || placeholder;
  const isSelected = value !== '';

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`w-full px-4 py-2 font-semibold rounded-[50px] cursor-pointer hover:bg-yg-primary/15 focus:outline-none transition-colors ${
          isSelected
            ? 'bg-yg-primary text-white hover:bg-yg-primary/80'
            : 'bg-yg-white text-yg-primary border border-yg-lightgray hover:bg-yg-primary/15'
        }`}
      >
        {displayValue}
      </button>
      {isOpen && (
        <div className="absolute w-full bg-white rounded shadow mt-2 z-10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="block w-full text-left px-4 py-2 cursor-pointer hover:bg-yg-lightgray"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
