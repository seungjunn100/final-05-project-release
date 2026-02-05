'use client';

import { useEffect, useState } from 'react';
import TabCard from './TabCard';
import { getSurveysFromServer, type SurveyHistoryItem } from '@/lib/api/survey';

interface SurveyTabProps {
  onSurveyClick: (targetId: string) => void;
}

export default function SurveyTab({ onSurveyClick }: SurveyTabProps) {
  const [surveys, setSurveys] = useState<SurveyHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSurveys = async () => {
      setIsLoading(true);
      const result = await getSurveysFromServer();
      if (result.ok === 1 && result.item) {
        // 최신순 정렬
        const sorted = result.item.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setSurveys(sorted);
      }
      setIsLoading(false);
    };

    loadSurveys();
  }, []);

  if (isLoading) {
    return (
      <TabCard>
        <h1 className="text-lg font-semibold mb-6">설문 정보</h1>
        <div className="text-center py-10">
          <p className="text-yg-darkgray">설문 기록을 불러오는 중...</p>
        </div>
      </TabCard>
    );
  }

  if (surveys.length === 0) {
    return (
      <TabCard>
        <h1 className="text-lg font-semibold mb-6">설문 정보</h1>
        <div className="text-center py-10">
          <p className="text-yg-darkgray mb-6">아직 작성한 설문이 없습니다.</p>
          <button
            onClick={() => window.location.href = '/survey'}
            className="bg-yg-primary rounded-[50px] text-yg-white font-semibold px-8 py-3 shadow-lg hover:bg-opacity-90 transition"
          >
            설문 시작하기
          </button>
        </div>
      </TabCard>
    );
  }

  return (
    <TabCard>
      <h1 className="text-lg font-semibold mb-6">설문 정보</h1>
      <div className="space-y-4">
        {surveys.map((survey) => (
          <div
            key={survey._id}
            className="border border-yg-primary rounded-[30px] p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => onSurveyClick(survey.target_id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg mb-2">{survey.memo.title}</h3>
                <p className="text-yg-darkgray text-sm">{survey.memo.date}</p>
                <p className="text-yg-darkgray text-xs mt-1">
                  추천 영양제 {survey.memo.supplements.length}개
                </p>
              </div>
              <button
                className="bg-yg-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              >
                <svg className="w-5 h-5 text-yg-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </TabCard>
  );
}