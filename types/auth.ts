// AuthInput 컴포넌트 props 타입 정의
export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  isValid?: boolean | null;
  message?: string;
}

// BaseButton 컴포넌트 props 타입 정의
export const sizeClasses = {
  sm: 'w-23',
  md: 'w-34',
  lg: 'w-45',
  xl: 'w-full',
} as const;

export const variantClasses = {
  basePrimary: 'text-yg-primary bg-yg-white outline-1 outline-yg-primary',
  primary: 'text-white bg-yg-primary',
  baseSecondary: 'text-yg-secondary bg-yg-white outline-1 outline-yg-secondary',
  secondary: 'text-white bg-yg-secondary',
  disabled: 'text-white bg-yg-gray',
} as const;

type ButtonSize = keyof typeof sizeClasses;
type ButtonVariant = keyof typeof variantClasses;

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSize;
  variant: ButtonVariant;
}

// 사용자 정보
export interface User {
  _id: number;
  email: string;
  name: string;
  phone: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  address: string;
  addressDetail: string;
}

// 토큰
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

// 로그인 응답 성공 타입 (토큰 미포함)
export interface UserInfoRes {
  ok: 1;
  item: User;
}

// 로그인 응답 성공 타입 (토큰 포함)
export interface LoginSuccessRes {
  ok: 1;
  item: User & { token: AuthToken };
}

// 서버 검증 에러 타입
export interface validationErrorInfo {
  type: string;
  value: string;
  msg: string;
  location: string;
}

// 로그인 응답 실패 타입
export interface ErrorRes {
  ok: 0;
  message: string;
  errors?: {
    [errorField: string]: validationErrorInfo;
  };
}

export type LoginActionState = LoginSuccessRes | ErrorRes | null;
export type UserActionState = UserInfoRes | ErrorRes | null;

// 이메일 응답 타입
export type EmailCheckRes = { ok: 1 } | { ok: 0; message: string };
