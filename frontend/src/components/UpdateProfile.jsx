import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { profileFields } from "../constants/updateProfileFields";

const UpdateProfile = ({setIsFormOpen}) => {
  const handleInput = () => {};

  return (
    <div className="relative w-full">
      <RiCloseLine className="absolute top-0 right-0 text-[30px] cursor-pointer" onClick={() => setIsFormOpen(false)} />

      <div className="space-y-5">
        <h1 className="font-semibold">Update Profile</h1>

        <form className="space-y-3">
          {profileFields.map((fields, index) => {
            return (
              <div className="flex items-center gap-1" key={index}>
                <label htmlFor="" className="text-[14px] w-20">
                  {fields.title}
                </label>
                <input
                  type={`${fields.name === "resume" ? "file" : fields.name === "email" ? "email" : "text"}`}
                  className="outline-none border border-slate-300 rounded-sm px-3 py-1"
                  name={fields.name}
                  onChange={handleInput}
                />
              </div>
            );
          })}

          <div className="flex items-center justify-end">
            <button className="bg-black px-3 py-1 rounded-md text-white opacity-50 cursor-pointer hover:opacity-70">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;