"use client";

import { useEffect, useState } from "react";
import EditModal from "../components/EditModal";
import {
  setIsAuthenticated,
  setPassword,
  setUserName,
} from "../redux/authSlice";
import { useRouter } from "next/navigation";

export default function UserTable() {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        alert("You must login to access page");
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch("/api/user");
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUserName,
        password: newPassword,
      }),
    });

    const updatedUser = await response.json();
    setUser(updatedUser);
    setOpenModal(false);
  };

  const Loading = () => {
    return (
      <>
        <div className="flex items-center justify-center">
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"
          ></div>
          <p className="ml-2 text-white font-bold tracking-wide">Loading...</p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="bg-[url('/assets/pokemon-background.png')] bg-center min-h-screen">
        <EditModal
          isOpen={openModal}
          closeModal={toggleModal}
          handleSubmit={handleUpdate}
          password={newPassword}
          username={newUserName}
          setPassword={setNewPassword}
          setUserName={setNewUserName}
        />
        <div className="container mx-auto px-6 py-[100px] ">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <button
                  onClick={toggleModal}
                  className="bg-green-500 p-2 text-white rounded-lg w-20"
                >
                  Edit{" "}
                </button>
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    {loading ? (
                      <Loading />
                    ) : (
                      <>
                        <thead class="bg-white border-b">
                          <tr>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              #
                            </th>
                            <th
                              scope="col"
                              class="text-md  font-bold text-gray-900 px-6 py-4 text-left"
                            >
                              Username
                            </th>
                            <th
                              scope="col"
                              class="text-md font-bold text-gray-900 px-6 py-4 text-left"
                            >
                              Password
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-gray-100 border-b">
                            <td class="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                              1
                            </td>
                            <td class="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {user?.username}
                            </td>
                            <td class="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              **********
                            </td>
                          </tr>
                        </tbody>
                      </>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
