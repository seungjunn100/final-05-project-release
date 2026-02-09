'use client';

import { signup } from '@/actions/auth';
import AuthInput from '@/components/auth/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import { emailCheck } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import * as PortOne from '@portone/browser-sdk/v2';
import { CertifyActionState } from '@/types/auth';

// 이메일, 비밀번호 정규 표현식
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordExp = /^.{4,}$/;

export default function SignupForm() {
  const [userState, formAction, isPending] = useActionState(signup, null);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [nameIsValid, setNameIsValid] = useState<boolean | null>(null);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean | null>(null);
  const [emailChecked, setEmailChecked] = useState<boolean | null>(null);
  const [emailCheckedMsg, setEmailCheckedMsg] = useState('');

  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdTouched, setPwdTouched] = useState<boolean | null>(null);
  const [pwdIsValid, setPwdIsValid] = useState<boolean | null>(null);

  const [pwdCheck, setPwdCheck] = useState('');
  const [pwdCheckError, setPwdCheckError] = useState('');
  const [pwdCheckTouched, setPwdCheckTouched] = useState<boolean | null>(null);
  const [pwdCheckIsValid, setPwdCheckIsValid] = useState<boolean | null>(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [certifyMsg, setCertifyMsg] = useState('');
  const [isCertified, setIsCertified] = useState<boolean | null>(null);

  const router = useRouter();

  // 회원가입 완료 시 로그인 페이지로 이동
  useEffect(() => {
    if (userState?.ok) {
      alert(`회원가입이 완료되었습니다!`);
      router.replace('/login');
    }
  }, [userState, router]);

  // 이름 입력시 형식 검증 (onChange)
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);

    if (nameTouched) {
      if (newName.trim() === '' || newName.length <= 1) {
        setNameIsValid(false);
        setNameError('이름은 2글자 이상 입력해주세요.');
      } else if (newName.length > 1) {
        setNameIsValid(true);
        setNameError('');
      }
    }
  };

  // 이름 입력시 형식 검증 (onBlur)
  const handleNameBlur = () => {
    setNameTouched(true);

    if (name.trim() === '' || name.length <= 1) {
      setNameIsValid(false);
      setNameError('이름은 2글자 이상 입력해주세요.');
    } else if (name.length > 1) {
      setNameIsValid(true);
    }
  };

  // 이메일 입력시 형식 검증 (onChange)
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (emailTouched) {
      if (!emailExp.test(newEmail)) {
        setEmailIsValid(false);
        setEmailError('올바른 이메일 형식이 아닙니다.');
      } else {
        setEmailError('');
        setEmailIsValid(true);
      }

      if (emailChecked) {
        setEmailChecked(null);
        setEmailCheckedMsg('');
      }
    }
  };

  // 이메일 입력시 형식 검증 (onBlur)
  const handleEmailBlur = () => {
    setEmailTouched(true);

    if (!emailExp.test(email)) {
      setEmailIsValid(false);
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailIsValid(true);
    }
  };

  // 이메일 중복확인
  const handleEmailCheck = async () => {
    const res = await emailCheck(email);

    if (!res.ok) {
      setEmailChecked(false);
      setEmailCheckedMsg(res.message);
    } else {
      setEmailChecked(true);
      setEmailCheckedMsg('사용 가능한 이메일입니다.');
    }
  };

  // 비밀번호 입력식 형식 검증 (onChange)
  const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPwd = event.target.value;
    setPwd(newPwd);

    if (pwdTouched) {
      if (!passwordExp.test(newPwd)) {
        setPwdIsValid(false);
        setPwdError('비밀번호는 4자리 이상입니다.');
      } else {
        setPwdError('');
        setPwdIsValid(true);
      }
    }

    if (passwordExp.test(pwdCheck)) {
      if (newPwd !== pwdCheck) {
        setPwdCheckIsValid(false);
        setPwdCheckError('비밀번호가 일치하지 않습니다.');
      } else {
        setPwdCheckIsValid(true);
        setPwdCheckError('');
      }
    }
  };

  // 비밀번호 입력식 형식 검증 (onBlur)
  const handlePwdBlur = () => {
    setPwdTouched(true);

    if (!passwordExp.test(pwd)) {
      setPwdIsValid(false);
      setPwdError('비밀번호는 4자리 이상입니다.');
    } else {
      setPwdIsValid(true);
    }
  };

  // 비밀번호 확인 입력식 형식 검증 (onChange)
  const handlePwdCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPwdCheck = event.target.value;
    setPwdCheck(newPwdCheck);

    if (pwdCheckTouched) {
      if (pwd !== newPwdCheck) {
        setPwdCheckIsValid(false);
        setPwdCheckError('비밀번호가 일치하지 않습니다.');
      } else {
        setPwdCheckIsValid(true);
        setPwdCheckError('');
      }
    }
  };

  // 비밀번호 확인 입력식 형식 검증 (onBlur)
  const handlePwdCheckBlur = () => {
    setPwdCheckTouched(true);

    if (pwd.trim() === '' && pwdCheck.trim() === '') {
      return;
    } else if (pwd !== pwdCheck) {
      setPwdCheckIsValid(false);
      setPwdCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPwdCheckIsValid(true);
    }
  };

  // 본인 인증 API
  const handleCertify = async () => {
    try {
      const res: CertifyActionState = await PortOne.requestIdentityVerification({
        storeId: 'store-d1ae51ff-3845-45e1-8c36-533945dd9929',
        channelKey: 'channel-key-10ef6a4b-a90d-4bec-88cd-8591a7903ff4',
        identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
      });

      if (!res) {
        setCertifyMsg('응답 없음');
        return;
      }

      if (res?.code) {
        setCertifyMsg(`본인인증 실패: ${res.message}`);
        return;
      }

      const certifyRes = await fetch('/api/certify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identityVerificationId: res.identityVerificationId }),
      });

      const certifyResData = await certifyRes.json();
      // console.log(certifyResData);

      if (!certifyResData.success) {
        setCertifyMsg(certifyResData.message);
        return;
      }

      setIsCertified(true);
      setPhoneNumber(certifyResData.phoneNumber);
      setCertifyMsg('본인인증 완료되었습니다.');
    } catch (err) {
      console.error('본인인증 오류:', err);
    }
  };

  // 폼 입력 데이터 모두 true 시
  const isFormValid = nameIsValid && emailChecked && pwdCheckIsValid && pwdIsValid && isCertified;

  return (
    <form action={formAction}>
      <AuthInput label="이름" name="name" type="text" placeholder="이름을 입력하세요." value={name} onChange={handleNameChange} onBlur={handleNameBlur} message={nameError} isValid={nameIsValid} />
      <div className="flex flex-col flex-wrap items-baseline gap-y-4 mb-6 md:flex-row md:gap-x-4">
        <AuthInput label="이메일" name="email" type="email" placeholder="이메일을 입력하세요." className="w-full mb-0 md:w-auto md:grow" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} message={emailError} isValid={emailIsValid} />
        <div className="w-full md:w-34">
          <label className="absolute -left-2499.75 inline-block mb-2 pl-5 font-medium text-yg-primary text-[14px] md:text-[18px] md:mb-3 md:relative">중복 확인</label>
          <BaseButton size="md" variant={emailIsValid && emailChecked !== true ? 'primary' : 'disabled'} disabled={!emailIsValid || emailChecked === true} className="w-full" onClick={handleEmailCheck}>
            중복 확인
          </BaseButton>
        </div>
        {emailCheckedMsg && <p className={`w-full mt-2 pl-5 text-[12px] ${emailChecked ? 'text-yg-primary' : 'text-yg-warning'} md:pl-6.5 md:text-[14px]`}>{emailCheckedMsg}</p>}
      </div>
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요." value={pwd} onChange={handlePwdChange} onBlur={handlePwdBlur} message={pwdError} isValid={pwdIsValid} />
      <AuthInput label="비밀번호 확인" name="passwordCheck" type="password" placeholder="비밀번호가 일치하는지 확인하세요." value={pwdCheck} onChange={handlePwdCheckChange} onBlur={handlePwdCheckBlur} message={pwdCheckError} isValid={pwdCheckIsValid} />
      <AuthInput label="휴대폰 번호" name="phone" type="tel" placeholder="본인인증 후 자동 입력됩니다." className="mb-0" value={phoneNumber} isValid={isCertified} readOnly />

      <div className="mt-12 md:mt-15">
        <BaseButton size="xl" variant={isCertified ? 'disabled' : 'primary'} onClick={handleCertify} disabled={isCertified === null && isCertified === false}>
          {isCertified ? '본인인증 완료' : '본인인증'}
        </BaseButton>
        {certifyMsg && <p className={`mt-2 pl-5 text-[12px] md:mt-3 md:pl-6.5 md:text-[14px] ${isCertified ? 'text-yg-primary' : 'text-yg-warning'}`}>{certifyMsg}</p>}

        <BaseButton type="submit" size="xl" variant={!isFormValid || isPending ? 'disabled' : 'primary'} disabled={!isFormValid || isPending} className="mt-4 md:mt-6">
          {isPending ? <BeatLoader size={10} color="#fff" /> : '회원가입'}
        </BaseButton>
        {userState?.ok === 0 && <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{userState.message}</p>}
      </div>
    </form>
  );
}
