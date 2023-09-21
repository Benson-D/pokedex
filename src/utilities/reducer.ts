import { PokeStats } from "../interface/pokeInterface";
import { determineWinner } from "./helper";

/**
 * The different types of actions that can be dispatched to the battleReducer.
 * @enum {string}
 */
enum BattleActionType {
  loaded = "loaded",
  battle = "battle",
  begin = "begin",
  end = "end",
}

/**
 * An object representing an action dispatched to the battleReducer.
 * @interface
 */
interface BattleAction {
  /** The type of the action being dispatched */
  type: BattleActionType;
  /** An array of Pokemon stats belonging to player one */
  playerOne: PokeStats[];
  /** An array of Pokemon stats belonging to player two */
  playerTwo: PokeStats[];
}

/**
 * The current state of the battle page.
 * @interface
 */
interface BattleState {
  /** An array of Pokemon stats belonging to player one */
  playerOne: PokeStats[];
  /** An array of Pokemon stats belonging to player two */
  playerTwo: PokeStats[];
  /** The index of the active Pokemon in the battle */
  active: number;
  /** Whether the battle page has loaded or not */
  loaded: boolean;
  /** Whether a battle is currently happening or not */
  battle: boolean;
  /** The name of the winner of the battle */
  winner: string;
}

/**
 * Reducer function for the battle page.
 * Handles the state when a user initiates a battle game.
 *
 * @param {BattleState} state - The current state of the battle.
 * @param {BattleAction} action - The action being performed on the battle state.
 * @returns {BattleState} The new state after the action is performed.
 */
function battleReducer(state: BattleState, action: BattleAction): BattleState {
  switch (action.type) {
    case BattleActionType.loaded: {
      return {
        active: 0,
        playerOne: action?.playerOne,
        playerTwo: action?.playerTwo,
        loaded: true,
        battle: false,
        winner: determineWinner(action?.playerOne, action?.playerTwo),
      };
    }
    case BattleActionType.battle: {
      return {
        ...state,
        active: 0,
        battle: true,
      };
    }
    case BattleActionType.begin: {
      return {
        ...state,
        active: state.active + 1,
      };
    }
    case BattleActionType.end: {
      return {
        ...state,
        battle: false,
      };
    }
    default:
      return state;
  }
}

export { battleReducer, BattleActionType };
