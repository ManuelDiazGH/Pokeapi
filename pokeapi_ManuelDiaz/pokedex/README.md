# Pokédex App

Una app React + TypeScript que muestra Pokémon de la PokéAPI. Simple y funcional

# Estructura

App.tsx (trae los datos)
  └── PokemonList.tsx (muestra la grilla)
      └── PokemonCard.tsx (tarjeta individual)

# Respuestas Conceptuales

# ¿Por qué el estado vive en App.tsx?

Porque es el componente padre. Si lo pongo más abajo, otros componentes no pueden acceder a él. Es lo más simple

# ¿Diferencia entre componente presentacional y contenedor?

- **Presentacional (PokemonList):** Solo renderiza. Recibe datos y props, nada más
- **Contenedor (App, PokemonCard):** Hace fetch, maneja estado, pasa datos

Es más fácil de testear cuando separas estas cosas

# ¿Qué sin [name] en useEffect?

Sin la dependencia, el fetch solo corre una vez. Si cambias de Pokémon, no se actualiza. Es un bug clásicoo

# ¿Por qué dos interfaces distintas?

Porque los endpoints devuelven cosas diferentes. La lista te da solo nombre y URL. El detalle te da stats, tipos, etc. Tiene sentido tener interfaces separadas

### ¿Por qué PokemonList no toca la API?

Así puedo hacerr componentes agnósticos. Si cambio de API, no toco PokemonList. Es reutilizable y fácil de testear sin mocks complejos

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Vite
- PokéAPI

## Correr

cd pokedex

npm install

npm run dev

url de react: `http://localhost:5173`
