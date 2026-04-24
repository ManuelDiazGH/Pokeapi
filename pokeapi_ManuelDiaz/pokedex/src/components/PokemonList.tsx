import type { PokemonListItem } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';

interface PokemonListProps {
  pokemons: PokemonListItem[];
  selected: string | null;
  onSelect: (name: string) => void;
}

export const PokemonList = ({ pokemons, selected, onSelect }: PokemonListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          isSelected={selected === pokemon.name}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};