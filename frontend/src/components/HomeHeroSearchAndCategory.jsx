import React, { useRef, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../store/slices/jobSlice";
import { useNavigate } from "react-router-dom";

const HomeHeroSearchAndCategory = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const jobCategory = [
    "Frontend Developer",
    "Backend Developer",
    "Data Engineer",
    "Software Engineer",
    "AI Engineer",
    "PHP Laravel Developr",
  ];
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 150;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 150;
    }
  };

  const seacrchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  };

  const CategoryJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  };

  return (
    <>
      <div className="relative z-10 flex items-center bg-white rounded-full shadow-lg mt-7 lg:w-[500px] md:w-[500px] w-1/1">
        <input
          type="text"
          value={query}
          placeholder="Find your dream job"
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none px-4 py-2 w-full text-black rounded-l-full"
        />
        <button className="bg-green-500 p-3 cursor-pointer rounded-r-full" onClick={seacrchJobHandler}>
          <IoSearch />
        </button>
      </div>

      <div className="w-full flex items-center justify-center mt-7">
        <div className="flex items-center gap-5 lg:w-[500px] md:w-[500px] w-1/1">
          <FaArrowCircleLeft
            className="lg:text-[35px] md:text-[35px] text-[50px] cursor-pointer"
            onClick={scrollLeft}
          />
          <div
            ref={scrollRef}
            className="flex items-center gap-5 overflow-hidden"
          >
            {jobCategory.map((item, index) => {
              return (
                <button
                  key={index}
                  className="bg-gray-100 shadow-lg rounded-full px-4 py-2 text-black cursor-pointer font-medium text-[14px] hover:bg-gray-200 whitespace-nowrap"
                  onClick={() => CategoryJobHandler(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <FaArrowCircleRight
            className="lg:text-[35px] md:text-[35px] text-[50px] cursor-pointer"
            onClick={scrollRight}
          />
        </div>
      </div>
    </>
  );
};

export default HomeHeroSearchAndCategory;