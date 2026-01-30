type NutritionFact = {
  name: string;
  amount: string;
  percent?: string;
};

type ProductInfoSectionProps = {
  features: string[];
  nutritionFacts: NutritionFact[];
  intake: string;
  cautions: string[];
};

export default function ProductInfoSection({ features, nutritionFacts, intake, cautions }: ProductInfoSectionProps) {
  return (
    <section className="space-y-10">
      {/* 주요 기능 */}
      <div id="features" className="rounded-lg bg-yg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-bold text-yg-black">주요 기능</h2>
        <ul className="list-disc space-y-2 pl-5 text-yg-black">
          {features.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 영양 정보 */}
      <div id="nutrition" className="rounded-lg bg-yg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-bold text-yg-black">영양 정보</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-yg-lightgray text-yg-darkgray">
              <th className="py-2 text-left">성분</th>
              <th className="py-2 text-left">함량</th>
              <th className="py-2 text-left">영양성분 기준치</th>
            </tr>
          </thead>
          <tbody>
            {nutritionFacts.map((item, idx) => (
              <tr key={idx} className="border-b border-yg-lightgray">
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.amount}</td>
                <td className="py-2">{item.percent ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 섭취 방법 */}
      <div id="intake" className="rounded-lg bg-yg-white p-6 shadow">
        <h2 className="mb-3 text-lg font-bold text-yg-black">섭취 방법</h2>
        <p className="text-yg-black">{intake}</p>
      </div>

      {/* 주의사항 */}
      <div id="cautions" className="rounded-lg border border-yg-warning bg-white p-6">
        <h2 className="mb-3 text-lg font-bold text-yg-warning">주의사항</h2>
        <ul className="list-disc space-y-2 pl-5 text-yg-black">
          {cautions.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
