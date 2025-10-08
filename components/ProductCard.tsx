import React from "react";
import type { Product } from "../apis/products";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-100 flex flex-col h-full transform hover:-translate-y-1 transition-transform"
    >
      <div className="relative pt-[100%] bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">
          {product.title}
        </h3>
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center text-yellow-400">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600 ml-1">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
          <div className="mt-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
