import { useEffect, useState } from 'react';
import type { PokemonListItem, PokemonListResponse } from './types/pokemon';
import { PokemonList } from './components/PokemonList';

const LIMIT = 20;

export function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: PokemonListResponse = await response.json();
        setPokemons(data.results);
        setHasMore(offset + LIMIT < data.count);
      } catch (err) {
        setPokemons([]);
        setSelected(null);
        setError(
          'No pudimos cargar la lista de Pokémon. Revisá tu conexión e intentá nuevamente.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [offset, reloadKey]);

  const handleNextPage = () => {
    setOffset((currentOffset) => currentOffset + LIMIT);
    setSelected(null);
  };

  const handlePreviousPage = () => {
    if (offset >= LIMIT) {
      setOffset((currentOffset) => currentOffset - LIMIT);
      setSelected(null);
    }
  };

  const handleRetry = () => {
    setReloadKey((currentKey) => currentKey + 1);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-red-600 p-6 text-white shadow-lg">
        <h1 className="text-center text-4xl font-bold">Pokédex</h1>
      </header>

      <main className="container mx-auto">
        {loading && (
          <div className="py-12 text-center">
            <p className="text-xl font-semibold text-white">Cargando Pokémon...</p>
          </div>
        )}

        {error && (
          <div
            className="m-4 rounded border border-red-400 bg-red-100 px-4 py-4 text-red-800"
            role="alert"
          >
            <p className="font-semibold">Ocurrió un error al cargar la app.</p>
            <p className="mt-1">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 rounded bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <PokemonList pokemons={pokemons} selected={selected} onSelect={setSelected} />

            <div className="flex justify-center gap-4 py-8">
              <button
                onClick={handlePreviousPage}
                disabled={offset === 0}
                className={`rounded-lg px-8 py-3 font-bold shadow-lg transition ${
                  offset === 0
                    ? 'cursor-not-allowed bg-gray-600 text-gray-400'
                    : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                }`}
              >
                Anterior
              </button>

              {hasMore && (
                <button
                  onClick={handleNextPage}
                  className="rounded-lg bg-yellow-400 px-8 py-3 font-bold text-gray-900 shadow-lg transition hover:bg-yellow-300"
                >
                  Siguiente
                </button>
              )}
            </div>

            {!hasMore && (
              <div className="py-8 text-center">
                <p className="text-lg font-semibold text-white">No hay más Pokémon</p>
              </div>
            )}

            <div className="py-4 text-center">
              <p className="text-sm text-white">
                Mostrando Pokémon {offset + 1} - {offset + pokemons.length}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
