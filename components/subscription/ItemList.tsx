import ListItem from './ListItem';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
}

interface ItemListProps {
  products: Product[];
  onToggleCheck: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export default function ItemList({ products, onToggleCheck, onIncrease, onDecrease }: ItemListProps) {
  return (
    <>
      <table className="w-full table-fixed border-separate border-spacing-y-6">
        <thead>
          <tr>
            <th className='w-8'>구매</th>
            <th className="w-97">제품명</th>
            <th className="w-25">수량</th>
            <th className='w-30'>가격</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ListItem
              key={product.id}
              product={product}
              onToggleCheck={onToggleCheck}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
