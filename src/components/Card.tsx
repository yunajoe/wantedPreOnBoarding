import { MockData } from "../types/data";

interface CardProps extends MockData {}

function Card({ boughtDate, price, productId, productName }: CardProps) {
  return (
    <div className="max-w-sm p-4 m-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-gray-500">{productName}</h2>
      <p className="text-gray-700">{price}</p>

      <p className="mb-2 text-lg font-bold text-gray-700">{boughtDate}</p>
      <p className="text-gray-600">{productId}</p>
    </div>
  );
}

export default Card;
