import { useReducer, useContext } from 'react';
import Button from '../components/Button';
import Player from '../components/Player';
import useInterval from '../hooks/useInterval';
import { FormattedPokemon } from '../interface/pokeInterface';
import { selectPlayers } from '../utilities/helper';
import { battleReducer, BattleActionType } from '../utilities/reducer';
import ThemeContext from '../context/ThemeContext';

const initialState = {
  playerOne: [],
  playerTwo: [],
  active: 0,
  loaded: false, 
  battle: false,
  winner: ''
};

/** Poke Battle Page, 
 * when a start button has been initiated will load up pokemon,
 * each player will have pokemon to battle with 
 * 
 * Props: 
 *     pokemon: [{id, name, experience, attack, image, type}]
 * State: 
 *    playerOne: FormattedPokemon[]
 *    playerTwo: PokeState[]
 *    loadPlayer: boolean
 *    activePokemon: number
 *    status: boolean 
 */
function PokeBattle({ pokemon }: { pokemon: FormattedPokemon[]}) {
  const [state, dispatch] = useReducer(battleReducer, initialState);
  const { dark } = useContext(ThemeContext);

  const loadPlayers = () => {
    const [setOne, setTwo] = selectPlayers(pokemon);
    dispatch({
      type: BattleActionType.loaded, 
      playerOne: setOne, 
      playerTwo: setTwo })
  }

  const battlePokemon = () => {
    if (active !== playerOne.length - 1) {
      dispatch({ 
        type: BattleActionType.begin,
        playerOne: state.playerOne,
        playerTwo: state.playerTwo })
    } else {
      dispatch({ 
        type: BattleActionType.end, 
        playerOne: state.playerOne, 
        playerTwo: state.playerTwo })
    }
  }
  const { playerOne, playerTwo, active, winner, loaded, battle } = state;
  useInterval(battlePokemon, battle === false ? null : 1500);

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
        {loaded && 
          <div className="flex flex-col items-center">
            <div className="mt-20 flex">
              <Player pokemon={playerOne} active={active} winner={winner === 'player 1'} /> 
              <Player pokemon={playerTwo} active={active} winner={winner === 'player 2'} /> 
            </div>
            {active === playerOne.length -1 
              && (<p className={`mt-10 font-bold text-xl
              ${dark ? 'text-white' : 'text-black'}`}>
                {winner.toUpperCase()} Wins!
                </p>)}
            <div className="mt-10 mb-4">
              <Button handler={() => { 
                dispatch({
                  type: BattleActionType.battle, 
                  playerOne: state.playerOne, 
                  playerTwo: state.playerTwo})
        }} title="Battle" />
            </div>
          </div>
        }
    </section>
  );
};

export default PokeBattle;
