'use server';

import { cookies } from 'next/headers';
import type { SurveyResultPayload } from '@/types/survey';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 게시글 API 응답 타입
interface PostItem {
  _id: number;
  type: string;
  title: string;
  content: string;
  user: {
    _id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface PostResponse {
  ok: 0 | 1;
  message?: string;
  item?: PostItem;
}

interface PostsResponse {
  ok: 0 | 1;
  message?: string;
  item?: PostItem[];
}

// 설문 content 타입
interface SurveyContent {
  date: string;
  payload: SurveyResultPayload;
  supplements: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
  }>;
}

export interface SurveyHistoryItem {
  _id: string;
  type: string;
  target_id: string;
  user_id: number;
  memo: {
    title: string;
    date: string;
    payload: SurveyResultPayload;
    supplements: Array<{
      id: string;
      name: string;
      price: number;
      description: string;
      imageUrl?: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

// 설문 기록 저장
export async function saveSurveyToServer(
  payload: SurveyResultPayload,
  supplements: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
  }>
): Promise<{ ok: 0 | 1; message?: string; item?: SurveyHistoryItem }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    console.log('🔑 Server Action - accessToken 존재:', !!accessToken);

    if (!accessToken) {
      return { ok: 0, message: '인증이 필요합니다.' };
    }

    // 설문 개수 조회
    const surveysResult = await getSurveysFromServer();
    const surveyCount = surveysResult.ok === 1 ? (surveysResult.item?.length || 0) : 0;

    // 1단계: 게시글 생성 (설문 기록을 게시글로 저장)
    const postData = {
      type: 'survey', // 설문 타입
      title: `건강 설문 #${surveyCount + 1}`,
      content: JSON.stringify({
        date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        payload,
        supplements,
      }),
    };

    console.log('📤 1단계: 게시글 생성 요청');
    
    const postResponse = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'client-id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    if (postResponse.status === 401) {
      return { ok: 0, message: '인증이 만료되었습니다. 다시 로그인해주세요.' };
    }

    const postResult = await postResponse.json();
    console.log('📥 1단계: 게시글 생성 응답:', postResult);

    if (!postResponse.ok || !postResult.item?._id) {
      return { ok: 0, message: postResult.message || '설문 기록 저장에 실패했습니다.' };
    }

    const postId = postResult.item._id;

    // 2단계: 생성된 게시글을 북마크
    const bookmarkData = {
      target_id: postId,
      memo: '내 설문 기록',
    };

    console.log('📤 2단계: 북마크 생성 요청, target_id:', postId);
    
    const bookmarkResponse = await fetch(`${API_URL}/bookmarks/post`, {
      method: 'POST',
      headers: {
        'client-id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bookmarkData),
    });

    const bookmarkResult = await bookmarkResponse.json();
    console.log('📥 2단계: 북마크 생성 응답:', bookmarkResult);

    if (!bookmarkResponse.ok) {
      // 게시글은 생성됐지만 북마크 실패 - 게시글 정보라도 반환
      console.warn('⚠️ 북마크 실패했지만 게시글은 생성됨');
    }

    // 성공 - SurveyHistoryItem 형식으로 반환
    return {
      ok: 1,
      item: {
        _id: bookmarkResult.item?._id || postId.toString(),
        type: 'post',
        target_id: postId.toString(),
        user_id: postResult.item.user._id,
        memo: {
          title: postData.title,
          date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
          payload,
          supplements,
        },
        createdAt: postResult.item.createdAt,
        updatedAt: postResult.item.updatedAt,
      },
    };
  } catch (error) {
    console.error('설문 기록 저장 오류:', error);
    return { ok: 0, message: '설문 기록 저장 중 오류가 발생했습니다.' };
  }
}

// 설문 기록 목록 조회
export async function getSurveysFromServer(): Promise<{
  ok: 0 | 1;
  message?: string;
  item?: SurveyHistoryItem[];
}> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return { ok: 0, message: '인증이 필요합니다.' };
    }

    // 내가 작성한 게시글 목록 조회 (type=survey인 것만)
    const response = await fetch(`${API_URL}/posts/users?type=survey`, {
      method: 'GET',
      headers: {
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      return { ok: 0, message: '인증이 만료되었습니다.' };
    }

    const result: PostsResponse = await response.json();

    if (!response.ok) {
      return { ok: 0, message: result.message || '설문 기록 조회에 실패했습니다.' };
    }

    // 게시글을 SurveyHistoryItem 형식으로 변환
    const surveys: SurveyHistoryItem[] = (result.item || []).map((post: PostItem) => {
      const content: SurveyContent = typeof post.content === 'string' 
        ? JSON.parse(post.content) 
        : post.content;
      
      return {
        _id: post._id.toString(),
        type: 'post',
        target_id: post._id.toString(),
        user_id: post.user._id,
        memo: {
          title: post.title,
          date: content.date,
          payload: content.payload,
          supplements: content.supplements,
        },
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });

    return { ok: 1, item: surveys };
  } catch (error) {
    console.error('설문 기록 조회 오류:', error);
    return { ok: 0, message: '설문 기록 조회 중 오류가 발생했습니다.' };
  }
}

// 특정 설문 기록 조회
export async function getSurveyByIdFromServer(
  targetId: string
): Promise<{ ok: 0 | 1; message?: string; item?: SurveyHistoryItem }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return { ok: 0, message: '인증이 필요합니다.' };
    }

    // 게시글 상세 조회
    const response = await fetch(`${API_URL}/posts/${targetId}`, {
      method: 'GET',
      headers: {
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      return { ok: 0, message: '인증이 만료되었습니다.' };
    }

    const result: PostResponse = await response.json();

    if (!response.ok || !result.item) {
      return { ok: 0, message: result.message || '설문 기록 조회에 실패했습니다.' };
    }

    // 게시글을 SurveyHistoryItem 형식으로 변환
    const post: PostItem = result.item;
    const content: SurveyContent = typeof post.content === 'string' 
      ? JSON.parse(post.content) 
      : post.content;

    const survey: SurveyHistoryItem = {
      _id: post._id.toString(),
      type: 'post',
      target_id: post._id.toString(),
      user_id: post.user._id,
      memo: {
        title: post.title,
        date: content.date,
        payload: content.payload,
        supplements: content.supplements,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    return { ok: 1, item: survey };
  } catch (error) {
    console.error('설문 기록 조회 오류:', error);
    return { ok: 0, message: '설문 기록 조회 중 오류가 발생했습니다.' };
  }
}

// 설문 기록 삭제
export async function deleteSurveyFromServer(
  postId: string
): Promise<{ ok: 0 | 1; message?: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return { ok: 0, message: '인증이 필요합니다.' };
    }

    // 게시글 삭제
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      return { ok: 0, message: '인증이 만료되었습니다.' };
    }

    const result = await response.json();

    if (!response.ok) {
      return { ok: 0, message: result.message || '설문 기록 삭제에 실패했습니다.' };
    }

    return { ok: 1 };
  } catch (error) {
    console.error('설문 기록 삭제 오류:', error);
    return { ok: 0, message: '설문 기록 삭제 중 오류가 발생했습니다.' };
  }
}