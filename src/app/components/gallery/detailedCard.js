export default function DetailedCard({ isOpen, onClose, pokemon }) {
  if (!isOpen) return null;

  const getPokemonStats = (data, statNames) => {
    const result = {};

    data.stats.forEach((stat) => {
      if (statNames.includes(stat.stat.name)) {
        result[stat.stat.name] = stat.base_stat;
      }
    });

    return result;
  };
  const requiredStats = ["attack", "speed", "defense", "hp"];

  // Get the stats
  const stats = getPokemonStats(pokemon, requiredStats);

  const getPokemonType = () => {
    return pokemon.types.map((type) => type.type.name);
  };
  const getPokemonAbility = () => {
    return pokemon.abilities.map((a) => a.ability.name);
  };

  const pokemontype = getPokemonType();
  const pokemonAbility = getPokemonAbility();

  return (
    <>
      <div className="fixed h-full inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-99 pb-4">
        <div className="w-full h-[300px] sm:max-w-md bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="bg-red-500 p-4 rounded-t-xl relative">
            <div className="absolute top-2 right-3 bg-white rounded-full p-1 text-gray-700 text-md font-bold">
              HP &nbsp;
              {stats.hp}
            </div>
            <div
              onClick={onClose}
              className=" absolute top-1 left-1 px-1 text-3xl rounded-full p-1 text-gray-700 text-xs font-bold cursor-pointer"
            >
              X
            </div>
            <img
              src={pokemon.sprites.other.home.front_default}
              alt="pokemon image"
              className="w-32 h-32 mx-auto"
            />
          </div>
          <div className="text-center px-4 py-2">
            <h2 className="text-xl font-bold uppercase">{pokemon.name}</h2>
            <div className="flex justify-center gap-2">
              <div className="text-sm bg-blue-100 tracking-wide text-blue-600 rounded-full px-2 py-1 mt-2 inline-block">
                {" "}
                {pokemontype[0]}
              </div>
              {pokemontype.length > 1 && (
                <div className="text-sm bg-blue-100 tracking-wide text-blue-600 rounded-full px-2 py-1 mt-2 inline-block">
                  {" "}
                  {pokemontype[1]}
                </div>
              )}
              <div className="text-sm bg-yellow-100 tracking-wide text-yellow-600 rounded-full px-2 py-1 mt-2 inline-block">
                {" "}
                {pokemonAbility[0]}
              </div>
              <div className="text-sm bg-yellow-100 tracking-wide text-yellow-600 rounded-full px-2 py-1 mt-2 inline-block">
                {" "}
                {pokemonAbility[1]}
              </div>
            </div>

            <div key="" className="flex justify-between text-gray-600 mt-4 ">
              <div className="text-center">
                <p className="text-sm">Attack</p>
                <p className="text-lg font-bold">{stats.attack} </p>
              </div>
              <div className="text-center">
                <p className="text-sm">Defense</p>
                <p className="text-lg font-bold">{stats.defense} </p>
              </div>
              <div className="text-center">
                <p className="text-sm">Speed</p>
                <p className="text-lg font-bold">{stats.speed} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
