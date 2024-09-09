import { useState } from "react";

export default function EditModal({
  isOpen,
  closeModal,
  handleSubmit,
  password,
  username,
  setPassword,
  setUserName,
}) {
  return (
    <>
      {isOpen && (
        <div className="fixed h-full inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-99">
          <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <div className="py-8">
              <center>
                <span className="text-xl font-semibold">
                  Enter your new username and password
                </span>
              </center>
            </div>

            <div>
              <label
                className="block font-medium text-sm text-gray-700"
                for="username"
                value="Username"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                for="password"
                value="Password"
              />
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    type="button"
                    id="togglePassword"
                    className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
                  ></button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                onClick={handleSubmit}
                className="ms-4 inline-flex items-center px-4 py-2 bg-blue-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="ms-4 inline-flex items-center px-4 py-2 bg-red-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
