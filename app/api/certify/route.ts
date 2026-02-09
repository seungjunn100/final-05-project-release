import { NextRequest, NextResponse } from 'next/server';

const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { identityVerificationId } = await request.json();

    const res = await fetch(`https://api.portone.io/identity-verifications/${identityVerificationId}`, {
      headers: {
        Authorization: `PortOne ${PORTONE_API_SECRET}`,
      },
    });

    if (!res.ok) {
      throw new Error('본인인증 정보 조회 실패');
    }

    const resData = await res.json();

    if (resData.status === 'VERIFIED') {
      return NextResponse.json({
        success: true,
        phoneNumber: '010-0000-0000', // 더미 데이터
        // phoneNumber: resData.verifiedCustomer.phoneNumber, // 실제 번호
      });
    } else {
      return NextResponse.json({
        success: false,
        message: '본인인증이 완료되지 않았습니다. 다시 시도해주세요.',
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: '본인인증 검증 중 오류가 발생했습니다. 다시 시도해주세요.',
    });
  }
}
