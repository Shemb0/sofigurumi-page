import { XIcon } from "@heroicons/react/solid";

const ProductForm = ({ remove, onChange, product }) => {
  return (
    <div className="flex items-center gap-3">
      <select
        name="item_count"
        onChange={(e) => onChange(e)}
        className="rounded-lg border border-sofi-200 px-2 py-1.5 text-sm text-sofi-700 bg-white focus:outline-none focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300"
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
      </select>
      <button
        type="submit"
        className="text-xs font-medium text-sofi-500 hover:text-sofi-700 transition-colors"
      >
        Actualizar
      </button>
      <button
        onClick={() => remove(product)}
        type="button"
        className="text-sofi-300 hover:text-sofi-500 transition-colors"
      >
        <span className="sr-only">Eliminar</span>
        <XIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ProductForm;
