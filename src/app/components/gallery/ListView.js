import { useSelector } from "react-redux";
import { useState } from "react";

export default function ListView() {
  const { pokemonList, loading, error, filterType, searchTerm, sortOrder } =
    useSelector((state) => state.pokemon);

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
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {filteredList.map((pokemon) => (
          <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="">
              <>
                <div className="p-2">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Pokemon Name
                  </div>
                  <div className="flex inline-flex gap-3">
                    <p className="block mt-1 text-lg leading-tight font-medium text-black ">
                      {pokemon.name}
                    </p>
                  </div>
                </div>
                <div className="p-2">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Type
                  </div>
                  {pokemon.types.map((type, index) => (
                    <div className="flex inline-flex gap-3" key={index}>
                      <p className="block mt-1 text-lg leading-tight font-medium text-black ">
                        {type.type.name} &nbsp;
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-2">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Ability
                  </div>
                  {pokemon.abilities.map((a, index) => (
                    <div className="flex inline-flex gap-3" key={index}>
                      <p className="block mt-1 text-lg leading-tight font-medium text-black ">
                        {a.ability.name} &nbsp;
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-2">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Stats
                  </div>
                  {pokemon.stats.map((stat, index) => (
                    <>
                      <div className="flex inline-flex gap-3" key={index}>
                        {stat.stat.name == "hp" && (
                          <p className="block mt-1 text-lg leading-tight font-medium text-black ">
                            Hp: &nbsp;{stat.base_stat}
                          </p>
                        )}
                        {stat.stat.name == "hp" && (
                          <p className="block mt-1 text-lg leading-tight font-medium text-black ">
                            Attack: &nbsp;{stat.base_stat}
                          </p>
                        )}
                        <br />
                      </div>
                      <div className="flex inline-flex gap-3">
                        {stat.stat.name == "speed" && (
                          <p className="block mt-1 text-lg leading-tight font-medium text-black ">
                            Speed: &nbsp;{stat.base_stat}
                          </p>
                        )}
                        {stat.stat.name == "defense" && (
                          <p className="block mt-1 text-lg leading-tight font-medium text-black ">
                            Defense: &nbsp;{stat.base_stat}
                          </p>
                        )}
                      </div>
                    </>
                  ))}
                </div>
              </>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
