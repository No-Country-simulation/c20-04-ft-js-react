import React, { useState } from "react";
import { FaPaw } from "react-icons/fa";

const countries = [
  "China",
  "India",
  "United States",
  "Indonesia",
  "Brazil",
  "Russia",
  "Japan",
  "Mexico",
  "Germany",
  "Philippines",
  "Vietnam",
  "United Kingdom",
  "France",
  "Italy",
  "South Korea",
  "Honduras",
  "Argentina",
  "Colombia",
  "Egypt",
];

interface form {
  description: string;
  country: string;
}

interface errorForm {
  description: string;
  country: string;
}

export default function AboutForm() {
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrorForm(errors as errorForm);
    } else {
      console.log(form);

      setErrorForm({
        description: "",
        country: "",
      });
    }
  };

  const [form, setForm] = useState<form>({
    description: "",
    country: "",
  });

  const [errorForm, setErrorForm] = useState<errorForm>({
    description: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorForm({ ...errorForm, [e.target.name]: "" }); //when on change being activated we clearing the input error
    console.log(form);
  };

  const validateForm = () => {
    let errors: Partial<errorForm> = {};
    if (form.description.length > 500) {
      errors.description = "max characters it's 500";
    }

    return errors;
  };

  return (
    <form
      className="flex flex-col items-center gap-[1.4rem] w-[90%] mx-auto max-w-[500px]"
      onSubmit={submitForm}
    >
      {/* form title */}
      <label
        className="text-2xl font-bold text-center text-purple-600 flex items-center"
        htmlFor="description"
      >
        Tell us about yourself
        <FaPaw className="ml-2 text-purple-500" />
      </label>
      <textarea
        className="w-full min-h-[250px] text-center px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        name="description"
        placeholder="Share something interesting!"
        onChange={handleChange}
      />
      {errorForm.description && (
        <p className="text-red-500 text-center text-[.8rem] mt-[.2rem]">
          {errorForm.description}
        </p>
      )}

      {/* countries selection */}
      <label
        htmlFor="country"
        className="text-xl font-bold text-center text-purple-600 flex items-center"
      >
        select a country
        <FaPaw className="ml-2 text-purple-500" />
      </label>

      <select
        name="country"
        id="country"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      >
        <option value="">select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* Submit button */}
      <div className="flex gap-[.6rem]">
        <button className="mt-4 px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300">
          Cancel
        </button>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
