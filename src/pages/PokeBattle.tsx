import { PokeStats } from '../interface/pokeInterface';

function PokeBattle({ pokemon }: { pokemon: PokeStats[]}) {

  return (
    <section className="flex flex-col justify-center">
        <h1 className="text-center">Let's test your skills to be a pokemon master</h1>
        <div></div>
    </section>
  );
};

export default PokeBattle;
