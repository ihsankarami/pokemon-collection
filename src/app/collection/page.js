"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import FilterDropdown from "../components/Filter";
import ToggleBtn from "../components/ToggleBtn";
import { useEffect, useState } from "react";
import GridView from "../components/gallery/GridView";
import ListView from "../components/gallery/ListView";
import {
  setPokemonList,
  setLoading,
  setError,
  setSearchTerm,
} from "../redux/pokemonSlice";
import { setIsAuthenticated } from "../redux/authSlice";
import LoadingSpinner from "../components/LoadinigSpinner";
import { fetchPokemonList } from "../redux/pokemonSlice";
import ScrollTopBtn from "../components/scrollTopBtn";

export default function Collection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [view, setView] = useState("grid");
  const [types, setTypes] = useState([]);
  const { loading, searchTerm, nextPageUrl, pokemonList } = useSelector(
    (state) => state.pokemon
  );
  const [showButton, setShowButton] = useState(false);

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

  const handleToggle = (viewType) => {
    setView(viewType);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("/api/pokemon-types");
        const data = await response.json();
        setTypes(data.results);
      } catch (error) {
        console.error("Error fetching Pokémon types:", error);
      }
    };

    fetchTypes();
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value)); // Update search term state
  };

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 70 >=
        document.documentElement.offsetHeight
      ) {
        if (nextPageUrl && !loading) {
          dispatch(fetchPokemonList(nextPageUrl));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, nextPageUrl, loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };

  return (
    <>
      <div className="bg-[url('/assets/pokemon-background.png')] bg-contain bg-center min-h-screen ">
        <header>
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className=" w-full text-white md:items-center sm:justify-between flex">
                <button
                  onClick={() => router.push("/user-information")}
                  className=" mx-1 lg:text-lg sm:text-md font-bold bg-blue-400 p-2 rounded-lg"
                >
                  User Information
                </button>
                <button
                  onClick={handleLogout}
                  className="mx-1 lg:text-lg sm:text-md font-bold bg-red-400 p-2 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="relative mt-6 max-w-lg mx-auto">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLineCap="round"
                    strokeLineJoin="round"
                    str
                  />
                </svg>
              </span>

              <input
                className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search Pokémon by name..."
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>
          </div>
        </header>

        <main className="relative z-9">
          <div className="container mx-auto px-6">
            <div className="inline-flex gap-2">
              <ToggleBtn view={view} onToggle={handleToggle} />
              <FilterDropdown typeData={types} />
            </div>
            {loading && <LoadingSpinner />}
            {view == "grid" ? (
              <div className="container mx-auto min-h-full">
                <GridView />{" "}
              </div>
            ) : (
              <div className="container mx-auto min-h-full">
                <ListView />{" "}
              </div>
            )}
          </div>
          {showButton && (
            <div className="fixed bottom-10 right-10">
              {" "}
              <ScrollTopBtn scroll={scrollToTop} />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
