export default function AuthCheckInput({ error }: { error?: string }) {
  return (
    <div>
      <div className={['flex shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-full', error && 'outline outline-yg-warning'].join(' ')}>
        <div className="relative w-full">
          <input type="radio" id="male" name="gender" value="M" className="peer absolute top-[50%] left-[50%] translate-[-50%] -z-10" />
          <label
            htmlFor="male"
            className="relative block text-yg-primary font-medium text-center md:text-[18px]/13 bg-yg-white rounded-l-full peer-checked:text-white peer-focus:z-10 peer-checked:bg-yg-primary peer-focus:outline peer-focus:outline-yg-primary  peer-focus:shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
          >
            남성
          </label>
        </div>
        <div className="relative w-full">
          <input type="radio" id="female" name="gender" value="F" className="peer absolute top-[50%] left-[50%] translate-[-50%] -z-10" />
          <label
            htmlFor="female"
            className="relative block text-yg-primary font-medium text-center md:text-[18px]/13 bg-yg-white rounded-r-full peer-checked:text-white peer-focus:z-10 peer-checked:bg-yg-primary peer-focus:outline peer-focus:outline-yg-primary  peer-focus:shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
          >
            여성
          </label>
        </div>
      </div>
      {error && <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{error}</p>}
    </div>
  );
}
