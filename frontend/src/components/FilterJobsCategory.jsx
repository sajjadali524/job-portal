import React, { useEffect, useState } from "react";
import { filterJobCategoryForm } from "../constants/FilterJobCategoryFields";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../store/slices/jobSlice";

const FilterJobsCategory = () => {
  const [query, setQuery] = useState("");
  const [screenSize, setScreenSize] = useState(window.screen.width < 768)
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.screen.width < 768 && window.screen.width > 400);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  }, []);

  useEffect(() => {
    dispatch(setSearchedQuery(query));
  }, [query, dispatch, screenSize]);

  const gridGlass = screenSize ? "grid-cols-2": "grid-cols-1";

  return (
    <div className={`grid lg:grid-cols-1 md:grid-cols-4 grid-cols-1 py-5 space-y-5 lg:w-2/6 w-full shadow-md px-3 ${gridGlass}`}>
      <h1 className="py-3 border-b border-slate-200 font-bold opacity-70">Filter Job</h1>
      {filterJobCategoryForm.map((item, index) => {
        return (
          <div className="space-y-2" key={index}>
            <h1 className="font-semibold">{item.title}</h1>
            <div className="space-y-2 px-3">
              {item.options.map((option, i) => {
                return (
                  <div className="flex items-center space-x-3" key={i}>
                    <input type="radio" onChange={(e) => setQuery(e.target.value)} value={option.option} name={option.name} />
                    <label
                      htmlFor={item.title}
                      className="font-medium text-[13px]"
                    >
                      {option.option}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterJobsCategory;