import React from "react";
import { filterJobCategoryForm } from "../constants/FilterJobCategoryFields";

const FilterJobsCategory = () => {
  return (
    <div className="lg:block flex flex-wrap lg:space-y-5 space-y-8 lg:w-1/5 w-full lg:py-0 py-5 lg:h-screen shadow-md px-3 lg:space-x-0 md:space-x-10 space-x-5">
      <h1 className="py-3 border-b border-slate-200 font-bold opacity-70">Filter Job</h1>
      {filterJobCategoryForm.map((item, index) => {
        return (
          <div className="space-y-2" key={index}>
            <h1 className="font-semibold">{item.title}</h1>
            <div className="space-y-2 px-3">
              {item.options.map((option, i) => {
                return (
                  <div className="flex items-center space-x-3" key={i}>
                    <input type="radio" name={option.name} />
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