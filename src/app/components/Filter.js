"use client";

import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilterType, setSortOrder } from "../redux/pokemonSlice";

export default function FilterDropdown({ typeData }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const { filterType, sortOrder } = useSelector((state) => state.pokemon);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add the type to the filterType array if checked
      dispatch(setFilterType([...filterType, selectedType]));
    } else {
      // Remove the type from the filterType array if unchecked
      const updatedFilterType = filterType.filter(
        (type) => type !== selectedType
      );
      dispatch(setFilterType(updatedFilterType));
    }
  };

  const handleSortChange = (order) => {
    if (sortOrder === order) {
      dispatch(setSortOrder(null));
    } else {
      dispatch(setSortOrder(order));
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        id="dropdownDefault"
        className="bg-white p-1 tracking-wide hover:text-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="button"
      >
        Filter
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        id="dropdown"
        className={`${
          !open
            ? "hidden z-10 absolute w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
            : "z-10 absolute w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
        }`}
      >
        <div className="flex flex-col">
          <button
            onClick={() => {
              setOpenType(!openType);
              setOpenSort(false);
            }}
            className="mb-3 text-sm font-medium text-gray-900 dark:text-white inline-flex text-center"
            type="button"
          >
            Type{" "}
            {openType ? (
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => {
              setOpenSort(!openSort);
              setOpenType(false);
            }}
            className="mb-3 text-sm font-medium text-gray-900 dark:text-white inline-flex text-center"
            type="button"
          >
            Sort Name
            {openSort ? (
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </button>
        </div>

        {openType && (
          <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
            {typeData.map((data) => (
              <li key={data.name} className="flex items-center">
                <input
                  onChange={handleTypeChange}
                  id={data.id}
                  type="checkbox"
                  value={data.name}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  checked={filterType.includes(data.name)}
                />

                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {data.name}
                </label>
              </li>
            ))}
          </ul>
        )}

        {openSort && (
          <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
            <li key={""} className="flex items-center">
              <input
                onChange={() => handleSortChange("asc")}
                type="checkbox"
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                checked={sortOrder == "asc"}
              />

              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                A - Z
              </label>
            </li>
            <li key={""} className="flex items-center">
              <input
                onChange={() => handleSortChange("desc")}
                type="checkbox"
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                checked={sortOrder == "desc"}
              />

              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Z - A
              </label>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
