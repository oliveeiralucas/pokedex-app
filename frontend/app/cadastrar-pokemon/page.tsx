"use client";
import React, { useState } from "react";
import axios from "axios";

// Lista de tipos de Pokémon (Enum do banco de dados)
const tipos = [
  "Normal",
  "Fogo",
  "Agua",
  "Planta",
  "Eletrico",
  "Psiquico",
  "Gelo",
  "Lutador",
  "Venenoso",
  "Terrestre",
  "Voador",
  "Inseto",
  "Pedra",
  "Fantasma",
  "Dragao",
  "Noturno",
  "Aco",
  "Fada",
];

const CadastrarPokemon: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    nivel: "",
    altura: "",
    peso: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.tipo ||
      !formData.nivel ||
      !formData.altura ||
      !formData.peso
    ) {
      setMessage("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/pokemons", {
        ...formData,
        nivel: parseInt(formData.nivel),
        altura: parseFloat(formData.altura),
        peso: parseFloat(formData.peso),
      });
      setMessage("Pokémon cadastrado com sucesso!");
      setFormData({ nome: "", tipo: "", nivel: "", altura: "", peso: "" }); // Limpa o formulário
    } catch (error) {
      setMessage(`Erro ao cadastrar Pokémon. Tente novamente. ${error}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-700 to-blue-800 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-6">
          Cadastro de Pokémon
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="nome"
              className="block text-lg text-gray-700 font-medium mb-2"
            >
              Nome do Pokémon:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome"
            />
          </div>

          <div>
            <label
              htmlFor="tipo"
              className="block text-lg text-gray-700 font-medium mb-2"
            >
              Tipo de Pokémon:
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um tipo</option>
              {tipos.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="nivel"
              className="block text-lg text-gray-700 font-medium mb-2"
            >
              Nível:
            </label>
            <input
              type="number"
              id="nivel"
              name="nivel"
              value={formData.nivel}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nível de 1 a 100"
            />
          </div>

          <div>
            <label
              htmlFor="altura"
              className="block text-lg text-gray-700 font-medium mb-2"
            >
              Altura (m):
            </label>
            <input
              type="number"
              step="0.01"
              id="altura"
              name="altura"
              value={formData.altura}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 0.5"
            />
          </div>

          <div>
            <label
              htmlFor="peso"
              className="block text-lg text-gray-700 font-medium mb-2"
            >
              Peso (kg):
            </label>
            <input
              type="number"
              step="0.01"
              id="peso"
              name="peso"
              value={formData.peso}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 6.0"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 transition"
          >
            Cadastrar Pokémon
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-xl text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CadastrarPokemon;
