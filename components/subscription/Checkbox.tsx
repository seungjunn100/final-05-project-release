'use client';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export default function Checkbox({ 
  checked, 
  onChange, 
  label, 
  className = '',
  disabled = false 
}: CheckboxProps) {
  return (
    <label className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
            checked
              ? 'bg-yg-primary border-yg-primary'
              : 'bg-white border-yg-gray'
          }`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      {label && (
        <span className="ml-2 text-sm select-none">
          {label}
        </span>
      )}
    </label>
  );
}