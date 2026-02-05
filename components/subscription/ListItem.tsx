import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
  imageUrl?: string;
}

interface ListItemProps {
  product: Product;
  onToggleCheck: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export default function ListItem({ product, onToggleCheck, onIncrease, onDecrease }: ListItemProps) {
  return (
    <tr>
      <td className="text-center">
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => onToggleCheck(product.id)}
        />
      </td>
      <td className="px-3">
        <div className="flex items-center">
          <div className="shrink-0 w-15 h-15 mr-5 relative">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center rounded-lg justify-center bg-white">
                <span className="text-2xl">💊</span>
              </div>
            )}
          </div>
          <h3 className="text-md">{product.name}</h3>
        </div>
      </td>
      <td className="text-center">
        <div className="flex justify-between items-center">
          <button
            className="bg-yg-gray w-6 h-6 rounded-full font-semibold shadow-lg text-base flex items-center justify-center -translate-y-0.5"
            onClick={() => onDecrease(product.id)}
          >
            −
          </button>
          <p className="max-w-1/6">{product.quantity}</p>
          <button
            className="bg-yg-gray w-6 h-6 rounded-full font-semibold shadow-lg text-base flex items-center justify-center -translate-y-0.5"
            onClick={() => onIncrease(product.id)}
          >
            +
          </button>
        </div>
      </td>
      <td className="text-center">
        <h3 className="text-md whitespace-nowrap">
          {(product.price * product.quantity).toLocaleString()}원
        </h3>
      </td>
    </tr>
  );
}
