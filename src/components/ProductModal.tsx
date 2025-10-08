import React, { useRef, useEffect } from "react";
import type { Product } from "../apis/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
const modalRef = useRef<HTMLDivElement>(null);

if (!product) return null;

const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
onClose();
}
};

useEffect(() => {
const handleEsc = (e: KeyboardEvent) => {
if (e.key === "Escape") onClose();
};
window.addEventListener("keydown", handleEsc);
return () => window.removeEventListener("keydown", handleEsc);
}, [onClose]);

return ( <div
   onClick={handleOutsideClick}
   className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
 > <div
     ref={modalRef}
     className="bg-white rounded-lg p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto shadow-2xl"
   > <button
       className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-gray-800"
       onClick={onClose}
     >
× </button>

    <img
      src={product.image}
      alt={product.title}
      className="h-48 mx-auto object-contain"
    />
    <h2 className="text-lg font-semibold mt-2 text-center">
      {product.title}
    </h2>
    <p className="text-gray-600 mt-2 text-center">{product.description}</p>
    <p className="text-blue-600 font-bold mt-3 text-center">
      ${product.price}
    </p>
    <span className="text-sm bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
      {product.category}
    </span>
  </div>
</div>


);
};

export default ProductModal;
