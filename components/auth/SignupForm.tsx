'use client';

import { signup } from '@/actions/auth';
import AuthInput from '@/components/auth/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import { emailCheck } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

// 이메일, 비밀번호 정규 표현식
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordExp = /^.{4,}$/;

export default function SignupForm() {
  const [userState, formAction, isPending] = useActionState(signup, null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCheckMsg, setEmailCheckMsg] = useState('');
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
  const [pwdCheck, setPwdCheck] = useState('');
  const [emailIsValid, setEmailIsValid] = useState<boolean | null>(null);
  const [pwdIsValid, setPwdIsValid] = useState<boolean | null>(null);
  const [name, setName] = useState('');
  const [nameReq, setNameReq] = useState<boolean | undefined>(undefined);
  const [pwdCheckReq, setPwdCheckReq] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  // 회원가입 완료 시 로그인 페이지로 이동
  useEffect(() => {
    if (userState?.ok) {
      alert(`회원가입이 완료되었습니다!`);
      router.replace('/login');
    }
  }, [userState, router]);

  // 이메일, 비밀번호 input 포커스 아웃 시 동작 함수
  const handleExpBlur = (exp: RegExp, type: string, setIsValid: (value: boolean | null) => void) => {
    if (type.trim() === '') {
      setIsValid(null);
      return;
    }
    setIsValid(exp.test(type));
  };

  // 이메일 중복 확인 함수
  const handleEmailCheck = async () => {
    const res = await emailCheck(email);

    if (!res.ok) {
      setEmailCheckMsg('이미 존재하는 이메일입니다.');
      setIsEmailAvailable(false);
      return;
    }

    setEmailCheckMsg('사용 가능한 이메일입니다.');
    setIsEmailAvailable(true);
  };

  // 이름 input 포커스 아웃 시 동작 함수
  const handleNameReqBlur = () => {
    if (name.trim() === '' || name.length <= 1) {
      setNameReq(false);
      return;
    }
    setNameReq(true);
  };

  // 비밀번호 확인 input 포커스 아웃 시 동작 함수
  const handlePwdCheckReqBlur = () => {
    if (password.length <= 3 || password.trim() === '') {
      setPwdCheckReq(undefined);
      return;
    }
    if (password !== pwdCheck) {
      setPwdCheckReq(false);
      return;
    }
    setPwdCheckReq(true);
  };

  // 폼 입력 데이터 모두 true 시
  const isFormValid = pwdCheckReq && nameReq && emailIsValid && pwdIsValid && isEmailAvailable === true;
  // const isSignup = isFormValid && Certificate;

  return (
    <form action={formAction}>
      <AuthInput label="이름" name="name" type="text" placeholder="이름을 입력하세요." value={name} required={nameReq} message="필수 입력 정보입니다. 2글자 이상 입력해주세요." onChange={(e) => setName(e.target.value)} onBlur={handleNameReqBlur} />
      <div className="flex flex-col flex-wrap items-baseline gap-x-4 mb-6 md:flex-row">
        <AuthInput
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력하세요."
          className="w-full mb-0 md:w-auto md:grow"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailCheckMsg('');
            setIsEmailAvailable(null);
          }}
          onBlur={() => handleExpBlur(emailExp, email, setEmailIsValid)}
          isValid={emailIsValid}
          message={emailIsValid ? '올바른 이메일 형식입니다.' : '올바른 이메일 형식이 아닙니다.'}
          error={userState?.ok === 0 ? userState?.errors?.email?.msg : null}
        />
        <div className="w-full md:w-34">
          <label className="absolute -left-2499.75 inline-block mb-2 pl-5 font-medium text-yg-primary text-[14px] md:text-[18px] md:mb-3 md:relative">중복 확인</label>
          <BaseButton size="md" variant={emailIsValid && isEmailAvailable !== true ? 'primary' : 'disabled'} disabled={!emailIsValid || isEmailAvailable === true} onClick={handleEmailCheck} className="w-full">
            중복 확인
          </BaseButton>
        </div>
        <p className={`w-full mt-2 pl-5 text-[12px] ${isEmailAvailable ? 'text-yg-primary' : 'text-yg-warning'} md:pl-6.5 md:text-[14px]`}>{emailCheckMsg}</p>
      </div>
      <AuthInput
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력하세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleExpBlur(passwordExp, password, setPwdIsValid)}
        isValid={pwdIsValid}
        message={pwdIsValid ? '올바른 비밀번호 형식입니다.' : '비밀번호는 4글자 이상 입력해야 합니다.'}
        error={userState?.ok === 0 ? userState?.errors?.password?.msg : null}
      />
      <AuthInput label="비밀번호 확인" name="password-check" type="password" placeholder="비밀번호가 맞는지 확인하세요." value={pwdCheck} required={pwdCheckReq} onChange={(e) => setPwdCheck(e.target.value)} onBlur={handlePwdCheckReqBlur} className="mb-0" message="비밀번호가 일치하지 않습니다." />

      <div className="mt-12 md:mt-15">
        {/* <BaseButton type="submit" size="xl" variant={!isFormValid ? 'disabled' : 'primary'} disabled={!isFormValid}>
          본인인증
        </BaseButton>
        <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">***님 인증 완료되었습니다.</p> */}

        <BaseButton type="submit" size="xl" variant={!isFormValid || isPending ? 'disabled' : 'primary'} disabled={!isFormValid || isPending} className="mt-4 md:mt-6">
          {isPending ? <BeatLoader size={10} color="#fff" /> : '회원가입'}
        </BaseButton>
        <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{userState?.ok === 0 && userState.message}</p>
      </div>
    </form>
  );
}
