import type { AuthInputProps } from '@/types/auth';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export default function AuthInput({ label, name, type = 'text', placeholder, className, value, isValid, message, required, onChange, onBlur, error }: AuthInputProps) {
  return (
    <div className={cn('mb-6', className)}>
      <label htmlFor={name} className="inline-block mb-2 pl-5 font-medium text-yg-primary text-[14px] md:text-[18px] md:mb-3 md:pl-6.5">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className={[
          'block w-full py-2.5 px-5 text-[14px]/[26px] text-yg-black bg-yg-white placeholder-yg-lightgray shadow-[0_0_15px_rgba(0,0,0,0.15)] focus:outline focus:outline-yg-primary focus:shadow-[0_4px_15px_rgba(0,0,0,0.2)] rounded-full md:py-3 md:px-6.5 md:text-[18px]/[28px]',
          isValid === true && 'outline outline-yg-primary',
          !error && isValid === false && 'outline outline-yg-warning',
          error && isValid === false && 'outline outline-yg-warning',
          required === false && 'outline outline-yg-warning',
          required === true && 'outline outline-yg-primary',
        ]
          .filter(Boolean)
          .join(' ')}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isValid === true && <p className="mt-2 pl-5 text-[12px] text-yg-primary md:mt-3 md:pl-6.5 md:text-[14px]">{message}</p>}
      {!error && isValid === false && <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{message}</p>}
      {error && isValid === false && <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{error}</p>}
      {required === false && <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{message}</p>}
    </div>
  );
}
