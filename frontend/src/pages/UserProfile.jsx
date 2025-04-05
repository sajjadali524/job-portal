import React, { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { Link } from "react-router-dom";
import AppliedJobs from "../components/AppliedJobs";
import UpdateProfile from "../components/updateProfile";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {user} = useSelector(store => store.auth);

  return (
    <>
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-[90%] max-w-lg">
            <UpdateProfile setIsFormOpen={setIsFormOpen} />
          </div>
        </div>
      )}

      <div className="w-full flex flex-col items-center justify-center gap-5 pt-10 lg:px-0 px-3">
        <div className="relative lg:w-1/2 w-full">
          <div className="relative w-full rounded-md drop-shadow-lg shadow-lg p-5 space-y-3">
            <div className="absolute right-3 top-7 p-1 border border-slate-300 cursor-pointer">
              <LiaEdit className="text-[17px]" onClick={() => setIsFormOpen(true)} />
            </div>

            <div className="flex items-center gap-5 py-2">
              <img src={user?.profile?.profilePhoto} alt="profile" className="w-10 h-10 rounded-full" />
              <div className="opacity-90">
                <h1 className="font-medium">{user?.fullName}</h1>
                <p className="font-normal text-[15px]">{user?.profile?.bio?.length > 0 ? user.profile.bio : "bio"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AiOutlineMail />
              <p className="opacity-80 text-[15px]">{user?.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <BsTelephone />
              <p className="opacity-80 text-[15px]">{user?.phoneNumber}</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Skills</p>
              <div className="flex items-center gap-2">
                {
                  user?.profile?.skills?.length > 0 ? user.profile.skills.map((skill, index) => {
                    return(
                      <p className="opacity-90 text-[14px] text-center bg-black rounded-full px-3 py-1 text-white" key={index}>{skill}</p>
                    )
                  }) : <p className="text-[14px]">No skills found</p>
                }
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Resume</p>
              {
                        user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
            </div>
          </div>
          <div className="w-full pt-10 space-y-3">
            <h1 className="font-semibold px-5">Applied Jobs</h1>
            <div className="w-full rounded-md shadow-lg border border-slate-300 space-y-3">
              <AppliedJobs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;