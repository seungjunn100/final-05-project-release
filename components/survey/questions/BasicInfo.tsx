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
  const chip = (active: boolean) => ['h-11 rounded-full border px-4 text-sm font-medium transition', active ? 'border-transparent bg-[var(--color-yg-primary)] text-white' : 'border-[var(--color-yg-lightgray)] bg-white text-[var(--color-yg-black)] hover:bg-[var(--color-yg-white)]'].join(' ');

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-semibold text-[var(--color-yg-black)]">성별</p>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className={chip(gender === 'M')} onClick={() => onChangeGender?.('M')}>
            남성
          </button>
          <button type="button" className={chip(gender === 'F')} onClick={() => onChangeGender?.('F')}>
            여성
          </button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-[var(--color-yg-black)]">연령대</p>
        <div className="grid grid-cols-2 gap-3">
          {ageOptions.map((a) => (
            <button key={a.id} type="button" className={chip(ageGroup === a.id)} onClick={() => onChangeAgeGroup?.(a.id)}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
