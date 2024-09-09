import { useSelector } from "react-redux";
import DetailedCard from "./detailedCard";
import { useState } from "react";

export default function GridView() {
  const { pokemonList, loading, error, filterType, searchTerm, sortOrder } =
    useSelector((state) => state.pokemon);
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  const handleClickedCard = (pokemon) => {
    setIsModalOpen(true);
    setSelectedPokemon(pokemon);
  };

  let filteredList =
    filterType.length === 0
      ? pokemonList
      : pokemonList.filter((pokemon) =>
          pokemon.types.some((type) => filterType.includes(type.type.name))
        );

  if (searchTerm) {
    filteredList = filteredList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOrder) {
    filteredList = [...filteredList].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }

  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 py-5">
        {filteredList.map((pokemon) => (
          <div
            className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-white cursor-pointer hover:bg-red-500"
            onClick={() => handleClickedCard(pokemon)}
          >
            <div className="flex justify-around h-56 w-full bg-cover">
              <img
                src={pokemon.sprites.other.home.front_default}
                className="pl-10"
              />
              <div className="w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  id="pokemon"
                >
                  <g transform="translate(401.062 -1247.363)">
                    <ellipse
                      cx="-340.289"
                      cy="1263.959"
                      fill="#fe0505"
                      stroke="#513e4b"
                      rx="9.5"
                      ry="9.504"
                      transform="skewX(-1.761)scale(1 .99953)"
                    ></ellipse>
                    <path
                      fill="#fff"
                      fill-rule="evenodd"
                      stroke="#513e4b"
                      stroke-width=".884"
                      d="M-369.61 1263.867c-.91.647-1.954 1.2-3.096 1.643-4.17 1.6-9.236 1.58-13.278-.05a13.28 13.28 0 0 1-2.642-1.428c.183 5.003 4.219 8.889 9.232 8.889 5.074-.01 9.375-3.986 9.784-9.053z"
                    ></path>
                    <path
                      fill="#513e4b"
                      fill-rule="evenodd"
                      d="m-369.816 1262.947-.453.353c-.836.593-1.621.97-2.728 1.4-3.939 1.51-8.82 1.491-12.638-.049h-.004a12.69 12.69 0 0 1-2.198-1.148c-.016-.01-.14-.114-.3-.227l-.77 1.244c.033.024-.102.323.081.444.759.5 1.595.937 2.492 1.303h.002c4.267 1.721 9.517 1.741 13.915.054h.004c1.176-.456 2.142-.916 3.125-1.614l-.028-.156-.088-.739-.412-.864z"
                      color="#000"
                      font-family="sans-serif"
                      font-weight="400"
                      overflow="visible"
                      // style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;white-space:normal;isolation:auto;mix-blend-mode:normal;solid-color:#000;solid-opacity:1"
                    ></path>
                    <path
                      fill="#00f"
                      stroke="#513e4b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width=".87"
                      d="M-349.737 1263.17a1.74 1.74 0 0 1 1.206 1.515 1.74 1.74 0 0 1-.939 1.692"
                      transform="skewX(-1.761)scale(1 .99953)"
                    ></path>
                    <path
                      fill="#fff"
                      d="M-389.069 1262.494a9.84 9.84 0 0 0 .178 3.444c.825-.154 1.462-.87 1.488-1.706.029-.952-.687-1.727-1.638-1.738z"
                    ></path>
                    <path
                      fill="#0071b4"
                      fill-opacity=".132"
                      fill-rule="evenodd"
                      d="m-401 1261.38 11.977 1.13-.11 1.424.256 2.005-10.934 6.326z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="px-5 py-3 text-center">
              <h3 className="text-gray-700 uppercase">{pokemon.name}</h3>
            </div>
          </div>
        ))}
        <DetailedCard
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          pokemon={selectedPokemon}
        />
      </div>
    </>
  );
}
