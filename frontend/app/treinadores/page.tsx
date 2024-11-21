"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Pokemon {
  id: number;
  nome: string;
}

interface Treinador {
  id: number;
  nome: string;
  idade: number;
  cidade: string;
  genero: string;
  equipe: string;
  pokemons: Pokemon[];
}

const ListarTreinadores: React.FC = () => {
  const [treinadores, setTreinadores] = useState<Treinador[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTreinadores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/treinadores"
        );
        setTreinadores(response.data);
      } catch (err) {
        setError(
          `Erro ao carregar treinadores. Tente novamente mais tarde. ${err}`
        );
      }
    };

    fetchTreinadores();
  }, []);

  return (
    <div className="bg-gradient-to-b from-purple-600 to-blue-800 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
        Lista de Treinadores
      </h1>

      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {treinadores.length === 0 && !error && (
        <p className="text-center text-gray-500 text-lg">
          Nenhum treinador cadastrado.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treinadores.map((treinador) => (
          <div
            key={treinador.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-300"
          >
            <h2 className="text-2xl font-extrabold text-blue-600 mb-4 text-center">
              {treinador.nome}
            </h2>
            <div className="flex flex-col space-y-2 mb-4">
              <p>
                <span className="font-semibold text-gray-700">Idade:</span>{" "}
                {treinador.idade} anos
              </p>
              <p>
                <span className="font-semibold text-gray-700">Cidade:</span>{" "}
                {treinador.cidade}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Gênero:</span>{" "}
                {treinador.genero}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Equipe:</span>{" "}
                {treinador.equipe}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Pokémons:
              </h3>
              <ul className="list-none space-y-1">
                {treinador.pokemons.length > 0 ? (
                  treinador.pokemons.map((pokemon) => (
                    <li
                      key={pokemon.id}
                      className="bg-gray-200 rounded-full px-4 py-2 inline-block text-gray-800"
                    >
                      {pokemon.nome}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum Pokémon registrado</p>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarTreinadores;
