import { useEffect, useState } from 'react';
import type { PokemonDetail } from '../types/pokemon';

interface PokemonCardProps {
  name: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  speed: 'Velocidad',
};

export const PokemonCard = ({ name, isSelected, onSelect }: PokemonCardProps) => {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: PokemonDetail = await response.json();
        setDetail(data);
      } catch (fetchError) {
        setDetail(null);
        setError('No se pudieron cargar los datos de este Pokémon.');
        console.error(`Error fetching ${name}:`, fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [name]);

  return (
    <div
      onClick={() => onSelect(name)}
      className={`cursor-pointer rounded-lg p-4 shadow-md transition transform ${
        isSelected
          ? 'scale-105 bg-yellow-50 ring-4 ring-yellow-400'
          : 'bg-white hover:shadow-lg'
      }`}
    >
      {loading ? (
        <div className="space-y-3" aria-label={`Cargando ${name}`}>
          <div className="h-32 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
      ) : error ? (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          <p className="font-semibold capitalize">{name}</p>
          <p className="mt-1">{error}</p>
        </div>
      ) : detail ? (
        <>
          <img
            src={detail.sprites.front_default || ''}
            alt={detail.name}
            className="h-32 w-full object-contain"
          />
          <h3 className="mt-2 text-lg font-bold capitalize">{detail.name}</h3>

          <div className="mt-2 flex flex-wrap gap-2">
            {detail.types.map((type) => (
              <span
                key={type.slot}
                className="rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-900"
              >
                {type.type.name}
              </span>
            ))}
          </div>

          {isSelected && (
            <div className="mt-4 border-t pt-4">
              <h4 className="mb-2 font-bold">Estadísticas base</h4>
              <div className="space-y-2">
                {detail.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between text-sm">
                      <span>{statLabels[stat.stat.name] ?? stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};
