'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

interface EmailParams {
  to: string;
  serviceName: string;
  subject: string;
  content: string;
}

interface EmailResponse {
  ok: number;
  message?: string;
}

/**
 * 이메일 전송
 */
export async function sendEmail(params: EmailParams): Promise<EmailResponse> {
  try {
    console.log('📧 이메일 전송 시작:', params.to);

    const response = await fetch(`${API_URL}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client-id': CLIENT_ID,
      },
      body: JSON.stringify(params),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ 이메일 전송 실패:', result.message);
      return {
        ok: 0,
        message: result.message || '이메일 전송에 실패했습니다.',
      };
    }

    console.log('✅ 이메일 전송 성공');
    return {
      ok: 1,
      message: '이메일이 전송되었습니다.',
    };
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    return {
      ok: 0,
      message: '이메일 전송 중 오류가 발생했습니다.',
    };
  }
}

/**
 * 결제 완료 이메일 HTML 템플릿 생성 (결제 완료 페이지와 동일한 디자인)
 */
function createPaymentEmailTemplate(data: {
  userName: string;
  products: Array<{ name: string; price: number; quantity: number }>;
  totalAmount: number;
  paymentMethod: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress1: string;
  shippingAddress2: string;
  couponDiscount: number;
  pointUsed: number;
  shippingFee: number;
}): string {
  const productRows = data.products
    .map(
      (product) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div>
            <p style="margin: 0; font-weight: 600; font-size: 16px;">${product.name}</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #666666;">수량: ${product.quantity}개</p>
          </div>
          <p style="margin: 0; font-weight: 600; font-size: 16px; margin-left: 16px;">${(product.price * product.quantity).toLocaleString()}원</p>
        </div>
      `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', sans-serif; background-color: #ffffff;">
        <div style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
          
          <!-- 완료 아이콘 -->
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="width: 80px; height: 80px; background-color: #4AC5B2; border-radius: 50%; line-height: 80px; text-align: center; margin: 0 auto;">
              <span style="font-size: 50px; color: #ffffff; font-weight: bold; line-height: 80px;">✓</span>
            </div>
          </div>

          <!-- 완료 메시지 -->
          <h1 style="text-align: center; font-size: 32px; font-weight: bold; margin: 0 0 24px 0;">결제가 완료되었습니다!</h1>
          <p style="text-align: center; color: #666666; font-size: 16px; margin: 0 0 40px 0;">
            주문해주셔서 감사합니다. 곧 배송을 시작하겠습니다.
          </p>

          <!-- 결제 정보 요약 -->
          <div style="background-color: #F8F8F8; border-radius: 50px; padding: 32px; margin-bottom: 32px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="font-weight: bold; font-size: 18px; margin: 0 0 16px 0;">결제 정보</h2>
            <div style="margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="color: #666666; font-size: 16px;">결제 방법</span>
                <span style="font-weight: 600; font-size: 16px; margin-left: 16px;">${data.paymentMethod}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666666; font-size: 16px;">결제 금액</span>
                <span style="font-weight: 600; font-size: 16px; color: #4AC5B2; margin-left: 16px;">${data.totalAmount.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          <!-- 주문 상품 -->
          <div style="background-color: #F8F8F8; border-radius: 50px; padding: 32px; margin-bottom: 32px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="font-weight: bold; font-size: 18px; margin: 0 0 16px 0;">주문 상품</h2>
            <div>
              ${productRows}
            </div>
          </div>

          <!-- 배송 정보 -->
          <div style="background-color: #F8F8F8; border-radius: 50px; padding: 32px; margin-bottom: 32px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="font-weight: bold; font-size: 18px; margin: 0 0 16px 0;">배송 정보</h2>
            <div style="line-height: 1.6;">
              <p style="margin: 0 0 8px 0; font-weight: 600; font-size: 16px;">${data.shippingName}</p>
              <p style="margin: 0 0 8px 0; color: #666666; font-size: 16px;">${data.shippingPhone}</p>
              <p style="margin: 0 0 8px 0; color: #666666; font-size: 16px;">${data.shippingAddress1}</p>
              <p style="margin: 0; color: #666666; font-size: 16px;">${data.shippingAddress2}</p>
            </div>
          </div>

          <!-- 버튼 -->
          <table style="width: 100%; margin-top: 32px; border-spacing: 8px;">
            <tr>
              <td style="width: 50%;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}" style="display: block; background-color: #ffffff; border: 1px solid #4AC5B2; color: #4AC5B2; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  홈으로
                </a>
              </td>
              <td style="width: 50%;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mypage?tab=subscription&refresh=true" style="display: block; background-color: #4AC5B2; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  구독 관리하기
                </a>
              </td>
            </tr>
          </table>

          <!-- 푸터 -->
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">이 메일은 발신 전용입니다.</p>
            <p style="margin: 0; color: #cccccc; font-size: 12px;">© 2026 YoungGoo. All rights reserved.</p>
          </div>

        </div>
      </body>
    </html>
  `;
}

/**
 * 결제 완료 이메일 전송
 */
export async function sendPaymentConfirmationEmail(data: {
  userEmail: string;
  userName: string;
  products: Array<{ name: string; price: number; quantity: number }>;
  totalAmount: number;
  paymentMethod: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress1: string;
  shippingAddress2: string;
  couponDiscount: number;
  pointUsed: number;
  shippingFee: number;
}): Promise<EmailResponse> {
  const emailContent = createPaymentEmailTemplate(data);

  return sendEmail({
    to: data.userEmail,
    serviceName: '영구 YoungGoo',
    subject: `[영구 YoungGoo] 결제 완료 - ${data.userName}님의 구독이 시작되었습니다! 🎉`,
    content: emailContent,
  });
}