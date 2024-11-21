"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

// Define os tipos para o estado do Pokémon
interface Pokemon {
  nome: string;
  imagem: string;
  tipos: string[];
  habilidades: string[];
  altura: number;
  peso: number;
}

const PesquisarPokemon: React.FC = () => {
  const [search, setSearch] = useState<string>(""); // Nome do Pokémon digitado
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Dados do Pokémon
  const [error, setError] = useState<string>(""); // Erro na busca

  const handleSearch = async () => {
    if (!search) {
      setError("Digite o nome de um Pokémon!");
      return;
    }

    try {
      setError(""); // Limpa erros anteriores
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      setPokemon({
        nome: response.data.name,
        imagem: response.data.sprites.front_default,
        tipos: response.data.types.map((t: any) => t.type.name),
        habilidades: response.data.abilities.map((a: any) => a.ability.name),
        altura: response.data.height / 10, // Altura em metros
        peso: response.data.weight / 10, // Peso em quilogramas
      });
    } catch (err: any) {
      setPokemon(null); // Limpa o Pokémon anterior, se existir
      setError("Pokémon não encontrado. Tente novamente!");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-600 to-purple-700 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-white mb-6">
        Pesquisa de Pokémon
      </h1>

      {/* Barra de Pesquisa */}
      <div className="flex justify-center items-center mb-6 w-full max-w-lg">
        <input
          type="text"
          placeholder="Digite o nome do Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-lg px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gradient-to-l hover:from-blue-700 hover:to-purple-700 transition duration-300"
        >
          Pesquisar
        </button>
      </div>

      {/* Exibição de Erros */}
      {error && (
        <p className="text-center text-red-500 text-lg mb-4">{error}</p>
      )}

      {/* Exibição de Resultados */}
      {pokemon && (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-6">
          <Image
            src={pokemon.imagem}
            alt={pokemon.nome}
            className="mx-auto rounded-full border-4 border-blue-300 shadow-md"
            height={200}
            width={200}
          />
          <h2 className="text-3xl font-extrabold text-center text-blue-600 mt-4">
            {pokemon.nome.toUpperCase()}
          </h2>
          <p className="text-lg text-gray-800 mt-2">
            <strong className="text-blue-600">Tipos:</strong>{" "}
            {pokemon.tipos.join(", ")}
          </p>
          <p className="text-lg text-gray-800 mt-2">
            <strong className="text-blue-600">Altura:</strong> {pokemon.altura}m
          </p>
          <p className="text-lg text-gray-800 mt-2">
            <strong className="text-blue-600">Peso:</strong> {pokemon.peso}kg
          </p>
          <p className="text-lg text-gray-800 mt-2">
            <strong className="text-blue-600">Habilidades:</strong>{" "}
            {pokemon.habilidades.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default PesquisarPokemon;
