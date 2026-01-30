type ProductSidePurchaseCardProps = {
  price: number;
  shippingLabel?: string;
};

export default function ProductSidePurchaseCard({ price, shippingLabel }: ProductSidePurchaseCardProps) {
  return (
    <aside className="col-span-4">
      <div className="sticky top-20 rounded-lg bg-yg-white p-6 shadow">
        <p className="text-sm text-yg-darkgray">구매 정보</p>

        <p className="mt-3 text-2xl font-extrabold text-yg-black">{price.toLocaleString()}원</p>

        {shippingLabel && <p className="mt-2 text-sm text-yg-darkgray">{shippingLabel}</p>}

        <div className="mt-5 space-y-3">
          <button className="w-full rounded-md bg-yg-primary py-3 font-semibold text-white">구매하기</button>
          <button className="w-full rounded-md border border-yg-lightgray bg-white py-3 font-semibold text-yg-black">장바구니</button>
        </div>
      </div>
    </aside>
  );
}
