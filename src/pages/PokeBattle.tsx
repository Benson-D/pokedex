import { useState } from 'react';
import Player from '../components/Player';
import useInterval from '../hooks/useInterval';
import { PokeStats } from '../interface/pokeInterface';
import { selectPlayers } from '../utilities/helper';

/** Poke Battle Page, 
 * when a start button has been initiated will load up pokemon,
 * each player will have pokemon to battle with 
 * 
 * Props: 
 *     pokemon: [{id, name, experience, attack, image, type}]
 * State: 
 *    playerOne: PokeStats[]
 *    playerTwo: PokeState[]
 *    loadPlayer: boolean
 *    activePokemon: number
 *    status: boolean 
 */
function PokeBattle({ pokemon }: { pokemon: PokeStats[]}) {
  const [playerOne, setPlayerOne] = useState<PokeStats[]>([]);
  const [playerTwo, setPlayerTwo] = useState<PokeStats[]>([]);
  const [loadPlayer, setLoadPlayer] = useState(false);
  const [activePokemon, setActivePokemon] = useState(0);
  const [status, setStatus] = useState(false);

  const loadPlayers = () => {
    const [setOne, setTwo] = selectPlayers(pokemon);
    setPlayerOne(setOne);
    setPlayerTwo(setTwo)
    setLoadPlayer(true);
  }

  const battle = () => {
    if (activePokemon !== playerOne.length - 1) {
      setActivePokemon(current => current + 1);
    } else {
      setActivePokemon(0);
      setStatus(false);
    }
  }

  useInterval(battle, status === false ? null : 2000);

  return (
    <section>
        <h1 className="text-center font-medium text-base leading-4">
          Let's test your skills to be a pokemon master
        </h1>
        <div className="mt-10 flex justify-center">
          {pokemon.length > 0 && (
            <button className="bg-red-200 py-2 px-6 hover:bg-red-400 rounded" 
                    onClick={loadPlayers}>
              Start
            </button>
          )}

        </div>
        {loadPlayer && 
          <div className="flex flex-col items-center">
            <div className="mt-20 flex">
              <Player pokemon={playerOne[activePokemon]} /> 
              <Player pokemon={playerTwo[activePokemon]} /> 
            </div>
            <div className="mt-20">
              <button className="bg-red-200 py-4 px-8 hover:bg-red-400 rounded"
                      onClick={() => setStatus(true)}>
                Battle
              </button>
            </div>
          </div>
        }
    </section>
  );
};

export default PokeBattle;
