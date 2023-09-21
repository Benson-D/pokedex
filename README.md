# Pokedex

Pokedex is a frontend application utilizing the [pokemon api](https://pokeapi.co/).
The frontend consist of React, TypeScript, GraphQL, and Tailwind.

- To view live demo click [here](https://pokedex-benson.netlify.app/)

Utilizes tanstack tables to display original pokemon, and allows a user to battle against pokemon.

## Installation/Scripts

**Frontend Setup**

- `cd` into the project directory
- `pnpm install` to install the dependencies needed for the application
- `pnpm run dev` to start the server
- Sets a pre commit hook for prettier to be used after every git commit

```console
pnpm install
pnpm run dev
```

**Frontend Build**

```console
pnpm run build
```

**Frontend Test**

- To run e2e testing with cypress

```console
pnpm run cypress
```
