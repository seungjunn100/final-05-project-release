import AuthInput from '@/components/auth/AuthInput';
import BaseButton from '@/components/common/BaseButton';

export default function SignupForm() {
  return (
    <form action="">
      <AuthInput label="이메일" name="email" type="email" placeholder="이메일을 입력하세요." error="이메일 형식이 올바르지 않습니다." />
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요." error="비밀번호는 최소 8자 이상이어야 합니다." />
      <AuthInput label="비밀번호 확인" name="password-check" type="password" placeholder="비밀번호를 입력하세요." className="mb-0" error="비밀번호가 일치하지 않습니다." />

      <div className="mt-12 md:mt-15">
        <BaseButton type="submit" size="xl" variant="primary">
          본인인증
        </BaseButton>
        <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">***님 인증 완료되었습니다.</p>

        <BaseButton type="submit" size="xl" variant="disabled" disabled className="mt-4 md:mt-6">
          회원가입
        </BaseButton>
        <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">아이디 또는 비밀번호가 잘못되었습니다. 정확히 입력해 주세요.</p>
      </div>
    </form>
  );
}
