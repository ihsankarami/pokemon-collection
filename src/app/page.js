"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToken, setIsToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        setIsToken(token);
      }
    };

    checkAuth();
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const LogInModal = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        router.push("/collection");
      } else {
        setError(data.error);
      }
    };

    return (
      isOpen && (
        <div className="fixed h-full inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-99">
          <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">Log In</span>
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
                onChange={(e) => setUsername(e.target.value)}
              />
              {error && (
                <span className="text-red-500">
                  Incorrect password or username
                </span>
              )}
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
                onClick={handleLogin}
                className="ms-4 inline-flex items-center px-4 py-2 bg-blue-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Sign In
              </button>
              <button
                onClick={toggleModal}
                className="ms-4 inline-flex items-center px-4 py-2 bg-red-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <motion.section
      className="min-h-screen "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <div>
        <br />
        <div className="flex flex-col lg:mt-[-120px] justify-center items-center mx-auto min-h-screen ">
          <div className="flex flex-col items-center lg:flex-row ] lg:gap-[80px] 2xl:gap-40">
            <motion.div
              className="flex flex-col my-auto lg:max-w-lg"
              initial={{ y: 200, scale: 0 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <h1 className="text-4xl text-center max-w-xs pt-5 text-red-500 lg:text-left lg:text-8xl font-bold">
                Let the fun begin!
              </h1>
              <h4 className="p-2 text-center max-w-xs md:text-xl text-gray-700 lg:text-left lg:ml-[-5px] lg:mt-4 lg:text-2xl">
                Explore the World of Pokémon: Catch Em All!
              </h4>
            </motion.div>
            <motion.img
              className="w-[300px] py-[20px] lg:w-[450px] lg:pt-[140px]"
              src="/assets/poke-ball.png"
              alt="gameboy pic"
              animate={{ y: 0, scale: 1 }}
              initial={{ y: -100, scale: 0 }}
              transition={{ delay: 2, type: "spring" }}
            />
          </div>

          <motion.div
            className=" mt-[-40px] max-w-[150px] lg:flex-row lg:ml-[-700px] lg:mt-[-50px] 2xl:ml-[-180px]"
            animate={{ x: 0 }}
            initial={{ x: -1800 }}
            transition={{ delay: 3, type: "spring" }}
          >
            {!isToken ? (
              <a
                onClick={toggleModal}
                className=" inline-block font-semibold group lg:px-8 lg:py-2 cursor-pointer "
              >
                <h1 className=" text-center lg:text-2xl bg-blue-400 rounded-md px-6 py-2  border-black group-hover:bg-black text-white group-hover:text-white">
                  Login
                </h1>
              </a>
            ) : (
              <a
                onClick={() => router.push("/collection")}
                className=" inline-block font-semibold group lg:px-8 lg:py-2 cursor-pointer "
              >
                <h1 className=" text-center lg:text-2xl bg-blue-400 rounded-md px-6 py-2  border-black group-hover:bg-black text-white group-hover:text-white">
                  Enter
                </h1>
              </a>
            )}
          </motion.div>
        </div>
        <LogInModal />
      </div>
    </motion.section>
  );
}
