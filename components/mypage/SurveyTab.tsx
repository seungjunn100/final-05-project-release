import TabCard from './TabCard';

interface Survey {
  id: number;
  title: string;
  date: string;
}

interface SurveyTabProps {
  surveys: Survey[];
  onSurveyClick: (id: number) => void;
}

export default function SurveyTab({ surveys, onSurveyClick }: SurveyTabProps) {
  return (
    <TabCard>
      <h1 className="text-lg font-semibold mb-6">설문 정보</h1>
      <div className="space-y-4">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className="border border-yg-primary rounded-[30px] p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg mb-2">{survey.title}</h3>
                <p className="text-yg-darkgray text-sm">{survey.date}</p>
              </div>
              <button
                onClick={() => onSurveyClick(survey.id)}
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