import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function SecondaryHeader({
  parentCategoriesState,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  // Check if there is overflow and update arrow visibility
  const checkForOverflow = () => {
    if (scrollRef?.current) {
      const { scrollLeft, scrollRight, scrollWidth, clientWidth } =
        scrollRef?.current;
      setShowLeftArrow(scrollLeft > 0); // Show left arrow if scrolled right
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth); // Show right arrow if not at the end
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, // Adjust scroll distance as needed
        behavior: "smooth",
      });
      setTimeout(checkForOverflow, 300); // Delay to check after scroll completes
    }
  };

  // Scroll the list to the right
  const scrollRight = () => {
    if (scrollRef?.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      scrollRef?.current.scrollBy({
        left: 200, // Adjust scroll distance as needed
        behavior: "smooth",
      });
      setTimeout(checkForOverflow, 300); // Delay to check after scroll completes
    }
  };

  // Check for overflow on component mount and when window resizes
  useEffect(() => {
    checkForOverflow();
    window.addEventListener("resize", checkForOverflow);
    scrollRef.current.addEventListener("scroll", checkForOverflow);
    return () => {
      window.removeEventListener("resize", checkForOverflow);
      scrollRef?.current?.removeEventListener("scroll", checkForOverflow);
    };
  }, [parentCategoriesState]);

  return (
    <div className="bg-gray-50 flex items-center w-full border-b-2 border-gray-200 relative overflow-x-hidden ">
      {showLeftArrow && (
        <div className="top-0 bottom-0 absolute -left-2 flex items-center justify-center bg-gradient-to-r from-transparent to-gray-50 pe-4">
          <IoIosArrowBack
            className="text-gray-500 cursor-pointer mx-2 bg-gray-50"
            size={25}
            onClick={scrollLeft}
          />
        </div>
      )}
      <ul
        className="flex items-center justify-between overflow-x-auto whitespace-nowrap w-full hide-scrollbar"
        ref={scrollRef}
      >
        {parentCategoriesState.map((category) => (
          <li
            key={nanoid()}
            data-id={category._id}
            onMouseEnter={handleMouseEnter}
            className={`text-[0.95rem] xl:text-[1rem] font-semibold capitalize border-b-2 border-transparent text-center py-6 px-6 hover:border-black`}
          >
            <Link>{category.name}</Link>
          </li>
        ))}

        <li>
          <Link
            to={"/seller/register"}
            onMouseEnter={handleMouseLeave}
            className="text-sm font-semibold capitalize py-6 px-4"
          >
            Sell On Vendora
          </Link>
        </li>
      </ul>

      {showRightArrow && (
        <div className="top-0 bottom-0  absolute -right-2  flex items-center justify-center bg-gradient-to-l from-transparent to-gray-50 ps-4">
          <IoIosArrowForward
            className="text-gray-500 cursor-pointer mx-2 bg-gray-50"
            size={25}
            onClick={scrollRight}
          />
        </div>
      )}
    </div>
  );
}
