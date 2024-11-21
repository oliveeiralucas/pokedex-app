const Home = () => {
  return (
    <div className="bg-gradient-to-b from-purple-600 to-blue-800 text-white flex flex-col items-center justify-center p-8">
      {/* Título Principal */}
      <h1 className="text-6xl font-extrabold text-center mb-8 drop-shadow-2xl">
        Bem-vindo à <span className="text-yellow-300">Pokedex</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-xl max-w-2xl text-center mb-10 drop-shadow-md">
        Explore o incrível mundo dos Pokémons! Pesquise por seus Pokémons
        favoritos ou conheça a lista de treinadores mais incríveis!
      </p>

      {/* Botão de Ação */}
      <div className="flex justify-center w-full">
        <a
          href="/pesquisar"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-gradient-to-l transition"
        >
          Comece sua jornada!
        </a>
      </div>
    </div>
  );
};

export default Home;
