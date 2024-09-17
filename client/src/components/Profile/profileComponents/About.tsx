import BirthdayIcon from "@/icons/Birthday";
import ClockIcon from "@/icons/Clock";
import HomeIcon from "@/icons/HomeIcon";
import { FaPaw } from "react-icons/fa";

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useGetAboutPropertiesQuery } from "@/redux/apiSlices/userQueryApi";
import { useParams } from "next/navigation";

import AboutForm from "./AboutForm";

export default function About() {
  const params = useParams();
  const username: string = params.userName as string;

  //? redux
  const { data, isError, isLoading, refetch } = useGetAboutPropertiesQuery(username);
  console.log(data);

  const handleFormSubmitSuccess = () => {
    // Refetch data after successful form submission
    refetch();
  };

  //form
  const [editMode, setEditMode] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  const newData = data?.data?.getUserByUsername;
  const createdAt = Number(newData.createdAt);
  const date = new Date(createdAt);

  const formatedDate = isNaN(date.getTime())
    ? "date not avalaible"
    : new Intl.DateTimeFormat("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);

  return (
    <article>
      < >
        {editMode ? (
          <AboutForm 
          setEditMode={setEditMode}
          description={data?.data?.getUserByUsername?.description}
          address={data?.data?.getUserByUsername.address}
          onSubmitSuccess={handleFormSubmitSuccess}
          />
        ) : (
          <div className="flex flex-col gap-[.6rem] items-start">
          {/* Title */}
        <p className="text-2xl font-bold text-center text-purple-600 flex items-center">
          <FaPaw className="mr-2 text-purple-500" />
          Self Introduction
        </p>

        {/* Description or default funny message */}
        <p className="text-lg text-gray-700">
          {data?.data?.getUserByUsername?.description ? (
            data?.data?.getUserByUsername?.description
          ) : (
            <span className="text-gray-500 italic">
              {" "}
              <FaPaw className="inline mr-1" />
              Oops! Looks like this user was too busy to write a
              self-introduction. 🐾
            </span>
          )}
        </p>

        {/* location and time joined*/}
        <section className="flex items-center gap-2 mt-8 text-gray-600">
          <ClockIcon className="text-purple-500" />
          <p className="text-sm font-semibold">Member since {formatedDate}</p>
        </section>

        <div className="mt-2">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-purple-500">Location:</span>{" "}
            {data?.data?.getUserByUsername.address || "Not provided"}
          </p>
        </div>
        <button className="mt-4 px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300 self-center lg:self-start"
        onClick={()=> setEditMode(true)}
        >
          Edit Info
        </button>
          
          </div >
          
        )}
      </>
    </article>
  );
}

