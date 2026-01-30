'use client';

import { signup } from '@/actions/auth';
import AuthInput from '@/components/auth/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import { useActionState } from 'react';

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <form action={formAction}>
      <AuthInput label="이름" name="name" type="text" placeholder="이름을 입력하세요." />
      <AuthInput label="이메일" name="email" type="email" placeholder="이메일을 입력하세요." error={state?.ok === 0 ? state?.errors?.email.msg : null} />
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요." error={state?.ok === 0 ? state?.errors?.password.msg : null} />
      {/* <AuthInput label="비밀번호 확인" name="password-check" type="password" placeholder="비밀번호를 입력하세요." error="비밀번호가 일치하지 않습니다." /> */}

      <div className="mt-12 md:mt-15">
        {/* <BaseButton type="submit" size="xl" variant="primary">
          본인인증
        </BaseButton>
        <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">***님 인증 완료되었습니다.</p> */}

        <BaseButton type="submit" size="xl" variant="disabled" disabled={isPending} className="mt-4 md:mt-6">
          회원가입
        </BaseButton>
        <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{state?.ok === 0 && state.message}</p>
      </div>
    </form>
  );
}
