import { useState } from 'react';
import { PokeStats } from '../interface/pokeInterface';
import { selectPlayers } from '../utilities/helper';

function PokeBattle({ pokemon }: { pokemon: PokeStats[]}) {
  const [playerOne, setPlayerOne] = useState();
  const [playerTwo, setPlayerTwo] = useState();

  const loadPlayers = () => {
    const players = selectPlayers(pokemon);
    console.log(players);
  }

  return (
    <section className="flex flex-col justify-center">
        <h1 className="text-center">Let's test your skills to be a pokemon master</h1>
        <div>
            <button onClick={loadPlayers}>Start</button>
        </div>
    </section>
  );
};

export default PokeBattle;
