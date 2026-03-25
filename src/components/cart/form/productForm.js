import { useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";

const ProductForm = ({ remove, update, product }) => {
  const [count, setCount] = useState(String(product.count || 1));

  // Sincroniza el select si el servidor devuelve un valor distinto
  useEffect(() => {
    setCount(String(product.count || 1));
  }, [product.count]);

  const handleUpdate = () => {
    update(product, parseInt(count));
  };

  return (
    <div className="flex items-center gap-3">
      <select
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="rounded-lg border border-sofi-200 px-2 py-1.5 text-sm text-sofi-700 bg-white focus:outline-none focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
      <button
        type="button"
        onClick={handleUpdate}
        className="text-xs font-medium text-sofi-500 hover:text-sofi-700 transition-colors"
      >
        Actualizar
      </button>
      <button
        type="button"
        onClick={() => remove(product)}
        className="text-sofi-300 hover:text-sofi-500 transition-colors"
      >
        <span className="sr-only">Eliminar</span>
        <XIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ProductForm;
