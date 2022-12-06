import { useState } from 'react';
import Player from '../components/Player';
import { PokeStats } from '../interface/pokeInterface';
import { selectPlayers } from '../utilities/helper';

function PokeBattle({ pokemon }: { pokemon: PokeStats[]}) {
  const [playerOne, setPlayerOne] = useState<PokeStats[]>([]);
  const [playerTwo, setPlayerTwo] = useState<PokeStats[]>([]);
  const [loadPlayer, setLoadPlayer] = useState(false);

  const loadPlayers = () => {
    const [setOne, setTwo] = selectPlayers(pokemon);
    setPlayerOne(setOne);
    setPlayerTwo(setTwo)
    setLoadPlayer(true);
  }

  return (
    <section>
        <h1 className="text-center font-medium text-base leading-4">
          Let's test your skills to be a pokemon master
        </h1>
        <div className="mt-10 flex justify-center">
            <button className="bg-red-200 py-2 px-6 hover:bg-red-400 rounded" onClick={loadPlayers}>
              Start
            </button>
        </div>
        {loadPlayer && 
          <div className="mt-20 flex justify-center">
            <Player pokemon={playerOne} /> 
            <Player pokemon={playerTwo} /> 
          </div>
        }
    </section>
  );
};

export default PokeBattle;
