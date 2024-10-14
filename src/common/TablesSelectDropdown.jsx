import { useEffect, useState } from "react";

export default function TablesSelectDropdown({
  entriesNum,
  setEntriesNum,
  setCurrentPage,
  currentPage,
  numberOfPages,
}) {
  const options = [5, 10, 15];
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    // If the current page is greater than the total number of pages after entriesNum changes
    if (currentPage > numberOfPages) {
      setCurrentPage(1); // Reset to the first page
    }
  }, [entriesNum, numberOfPages, currentPage, setCurrentPage]);

  return (
    <div className="relative w-full">
      {/* Toggle button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="outline-none hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white rounded-lg text-start text-sm  dark:bg-neutral-900 dark:border-neutral-700 dark:text-white "
        aria-expanded={isOpen}
      >
        {entriesNum || "Select option..."}
        <span className="absolute top-1/2 end-3 -translate-y-1/2">
          <svg
            className="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="mt-2 z-10 absolute w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-neutral-900 dark:border-neutral-700">
          {options.map((option) => (
            <div
              key={option}
              className={`py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 ${
                option.disabled ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => {
                setIsOpen(false);
                setEntriesNum(option);
              }}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
