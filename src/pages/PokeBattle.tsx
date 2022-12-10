import { useState, useContext } from 'react';
import Button from '../components/Button';
import Player from '../components/Player';
import useInterval from '../hooks/useInterval';
import { PokeStats } from '../interface/pokeInterface';
import { selectPlayers, determineWinner } from '../utilities/helper';
import ThemeContext from '../context/ThemeContext';

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
  const [winner, setWinner] = useState('');

  const { dark } = useContext(ThemeContext);

  const loadPlayers = () => {
    const [setOne, setTwo] = selectPlayers(pokemon);
    setActivePokemon(0);
    setPlayerOne(setOne);
    setPlayerTwo(setTwo)
    setLoadPlayer(true);
    setWinner(determineWinner(setOne, setTwo));
  }

  const battle = () => {
    if (activePokemon !== playerOne.length - 1) {
      setActivePokemon(current => current + 1)
    } else {
      setStatus(false); 
    }
  }

  useInterval(battle, status === false ? null : 1500);

  return (
    <section>
        <h1 className={`text-center font-medium text-base leading-4 mt-10
        ${dark ? 'text-white' : 'text-black'}`}>
          Let's test your skills to be a pokemon master
        </h1>
        <div className="mt-10 flex justify-center">
          {pokemon.length > 0 && (
            <Button handler={loadPlayers} title="Start" />
          )}
        </div>
        {loadPlayer && 
          <div className="flex flex-col items-center">
            <div className="mt-20 flex">
              <Player pokemon={playerOne[activePokemon]} /> 
              <Player pokemon={playerTwo[activePokemon]} /> 
            </div>
            {activePokemon === playerOne.length -1 
              && (<p className={`mt-10 font-bold text-xl
              ${dark ? 'text-white' : 'text-black'}`}>
                {winner.toUpperCase()} Wins!
                </p>)}
            <div className="mt-10 mb-4">
              <Button handler={() => {
                setActivePokemon(0);
                setStatus(true)}} title="Battle" />
            </div>
          </div>
        }
    </section>
  );
};

export default PokeBattle;
