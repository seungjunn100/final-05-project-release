import { BaseButtonProps, sizeClasses, variantClasses } from '@/types/auth';

export default function BaseButton({ type = 'button', size, variant, className, children, ...props }: BaseButtonProps) {
  return (
    <button type={type} className={[sizeClasses[size], variantClasses[variant], `block h-11.5 font-medium text-[16px] shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-full cursor-pointer md:h-13 md:text-[18px]`, className].join(' ')} {...props}>
      {children}
    </button>
  );
}
