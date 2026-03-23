import { SearchIcon } from "@heroicons/react/solid";

const SearchBox = ({ categories, search, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="text-base font-medium text-gray-500 hover:text-gray-900"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        id="search"
        name="search"
        onChange={(e) => onChange(e)}
        value={search}
        required
        className="block w-full bg-white border border-sofi-200 rounded-full py-2 pl-10 pr-3 text-sm placeholder-sofi-400 focus:outline-none focus:text-sofi-900 focus:placeholder-sofi-300 focus:ring-1 focus:ring-sofi-300 focus:border-sofi-300 sm:text-sm"
        placeholder="Search"
        type="search"
      />
    </form>
  );
};

export default SearchBox;
