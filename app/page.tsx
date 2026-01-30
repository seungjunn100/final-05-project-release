import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <section id="visual">
        <div className="flex flex-col justify-center items-baseline gap-5 h-120 px-4 xl:w-300 xl:mx-auto xl:px-0">
          <h1 className="font-bold text-4xl/[1.4]">
            당신과 쭉 함께하는 <br />
            맞춤 영양제 구독
          </h1>
          <Link href="/survey" className="inline-block px-10 py-3 font-medium text-xl text-white bg-yg-primary rounded-full">
            AI 추천받기
          </Link>
        </div>
      </section>

      <section id="service" className="bg-gray-200">
        <div className="px-4 py-25 h-120 xl:w-300 xl:mx-auto xl:px-0">
          <h2 className="font-bold text-[28px]">서비스</h2>
        </div>
      </section>
    </main>
  );
}
