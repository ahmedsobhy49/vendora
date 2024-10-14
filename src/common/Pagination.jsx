import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function Pagination({
  numberOfPages,
  currentPage,
  onPageChange,
  showingFrom,
  showingTo,
  totalEntries,
  itemsPerPageLabel = "entries",
  customRenderPageNumber,
}) {
  const getPageNumbers = () => {
    const pages = [];

    // If number of pages is 5 or less, show all pages
    if (numberOfPages <= 5) {
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the current page, the next one, ellipsis, and the last two pages
      let startPage = currentPage;
      let nextPage = currentPage + 1;

      // Add the current and next pages to the array
      pages.push(startPage);
      if (nextPage <= numberOfPages - 2) {
        pages.push(nextPage);
      }

      // Add ellipsis only if the current page is not too close to the end
      if (currentPage < numberOfPages - 2) {
        pages.push("...");
      }

      // Add the last two pages
      pages.push(numberOfPages - 1);
      pages.push(numberOfPages);

      // If the remaining pages are 5 or fewer, show them all
      if (numberOfPages - currentPage <= 4) {
        pages.length = 0; // Clear the array
        for (let i = numberOfPages - 4; i <= numberOfPages; i++) {
          pages.push(i);
        }
      }
    }

    // Remove duplicates in case they were added
    return [...new Set(pages)];
  };

  if (!totalEntries) {
    return null; // or return a placeholder if needed
  }
  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-4 flex justify-between items-center">
      <span className="text-gray-500 text-xs sm:text-[1rem]">
        {`Showing ${
          showingFrom + 1
        } to ${showingTo} of ${totalEntries} ${itemsPerPageLabel}`}
      </span>
      <div className="flex space-x-1">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm shadow-sm hover:shadow-lg hover:bg-black hover:text-white bg-white text-black ml-2 flex items-center justify-center"
        >
          <GrFormPrevious className="text-lg" />
        </button>
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={typeof page !== "number"} // Disable ellipsis button
            className={`${
              currentPage === page
                ? "bg-black text-white"
                : "bg-white text-black"
            } min-w-9 rounded-md py-2 px-3 border border-transparent text-center text-sm shadow-md hover:shadow-lg focus:shadow-none hover:bg-black hover:text-white active:shadow-none ml-2 ${
              page === "..." ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {customRenderPageNumber ? customRenderPageNumber(page) : page}
          </button>
        ))}
        <button
          onClick={() =>
            currentPage < numberOfPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === numberOfPages}
          className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm shadow-sm hover:shadow-lg hover:bg-black hover:text-white bg-white text-black ml-2 flex items-center justify-center"
        >
          <GrFormNext className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
