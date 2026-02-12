type Props = {
  gender?: 'M' | 'F';
  ageGroup?: string;
  onChangeGender?: (g: 'M' | 'F') => void;
  onChangeAgeGroup?: (a: string) => void;
};

const ageOptions = [
  { id: '10s', label: '10대' },
  { id: '20s', label: '20대' },
  { id: '30s', label: '30대' },
  { id: '40s', label: '40대' },
  { id: '50s', label: '50대+' },
];

export default function BasicInfo({ gender, ageGroup, onChangeGender, onChangeAgeGroup }: Props) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-semibold text-yg-black">성별</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChangeGender?.('M')}
            className={`w-full py-3 rounded-full shadow-md transition
            ${gender === 'M' ? 'bg-yg-primary text-white' : 'bg-yg-white text-yg-primary hover:bg-yg-lightgray'}
          `}
          >
            남성
          </button>
          <button
            type="button"
            onClick={() => onChangeGender?.('F')}
            className={`w-full py-3 rounded-full shadow-md transition
            ${gender === 'F' ? 'bg-yg-primary text-white' : 'bg-yg-white text-yg-primary hover:bg-yg-lightgray'}
          `}
          >
            여성
          </button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-yg-black">연령대</p>
        <div className="grid grid-cols-2 gap-3">
          {ageOptions.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onChangeAgeGroup?.(a.id)}
              className={`w-full py-3 rounded-full shadow-md transition
              ${ageGroup === a.id ? 'bg-yg-primary text-white' : 'bg-yg-white text-yg-primary hover:bg-yg-lightgray'}
            `}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
