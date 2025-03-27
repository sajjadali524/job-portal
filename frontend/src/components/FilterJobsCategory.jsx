import React from "react";

const FilterJobsCategory = () => {
  return (
    <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-2 space-y-3 lg:w-1/5 md:w-1/5 w-full">
      <div className="space-y-2">
        <h1 className="font-semibold">Location</h1>
        <div className="space-y-2">
            <div className="flex items-center space-x-3">
                <input type="radio" name="location" />
                <label htmlFor="location"  className="font-medium text-[13px]">Karchi</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="location" />
                <label htmlFor="location"  className="font-medium text-[13px]">Islamabad</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="location" />
                <label htmlFor="location"  className="font-medium text-[13px]">Lahore</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="location" />
                <label htmlFor="location"  className="font-medium text-[13px]">Pindi</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="location" />
                <label htmlFor="location"  className="font-medium text-[13px]">KPK</label>
            </div>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold">Category</h1>
        <div className="space-y-2">
            <div className="flex items-center space-x-3">
                <input type="radio" name="category" />
                <label htmlFor="location"  className="font-medium text-[13px]">Frontend Developer</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="category" />
                <label htmlFor="location"  className="font-medium text-[13px]">Backend Developer</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="category" />
                <label htmlFor="location"  className="font-medium text-[13px]">Full Stack Developer</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="category" />
                <label htmlFor="location"  className="font-medium text-[13px]">Python Developer</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="category" />
                <label htmlFor="location"  className="font-medium text-[13px]">Data Engineer</label>
            </div>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold">Salary</h1>
        <div className="space-y-2">
            <div className="flex items-center space-x-3">
                <input type="radio" name="salary" />
                <label htmlFor="location"  className="font-medium text-[13px]">0-20K</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="salary" />
                <label htmlFor="location"  className="font-medium text-[13px]">20K-50K</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="salary" />
                <label htmlFor="location"  className="font-medium text-[13px]">50K-80K</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="salary" />
                <label htmlFor="location"  className="font-medium text-[13px]">80K-100K</label>
            </div>
            <div className="flex items-center space-x-3">
                <input type="radio" name="salary" />
                <label htmlFor="location"  className="font-medium text-[13px]">100K-500K</label>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FilterJobsCategory;
