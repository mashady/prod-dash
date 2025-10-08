import React from "react";

export type SortOption = "" | "priceLow" | "priceHigh" | "az";

interface SortDropdownProps {
  selected: SortOption;
  onChange: (value: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ selected, onChange }) => {
  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="block w-full pl-3 pr-10 py-2.5 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 appearance-none"
      >
        <option value="">Sort By</option>
        <option value="priceLow">Price: Low → High</option>
        <option value="priceHigh">Price: High → Low</option>
        <option value="az">Alphabetical (A–Z)</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;
