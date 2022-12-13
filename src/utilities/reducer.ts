import { PokeStats } from "../interface/pokeInterface";
import { determineWinner } from "./helper";

enum BattleActionType {
    loaded = 'loaded',
    battle = 'battle',
    begin = 'begin',
    end = 'end'
}
  
interface BattleAction {
    type: BattleActionType;
    playerOne: PokeStats[];
    playerTwo: PokeStats[];
}

interface BattleState {
    playerOne: PokeStats[];
    playerTwo: PokeStats[];
    active: number;
    loaded: boolean;
    battle: boolean;
    winner: string;
}
  
/**
 * Reducer function for battle page,
 * handles state when a user wants to initiate battle game
 * @param state 
 * @param action 
 * @returns {BattleState}
 */
function battleReducer(state: BattleState, action: BattleAction): BattleState {
    switch(action.type) {
        case 'loaded': {
            return {
                ...state,
                active: 0,
                playerOne: action?.playerOne,
                playerTwo: action?.playerTwo,
                loaded: true,
                winner: determineWinner(action?.playerOne, action?.playerTwo)
            }
        };
        case 'battle': {
            return {
                ...state,
                active: 0,
                battle: true
            }
        };
        case 'begin': {
            return {
                ...state,
                active: state.active + 1
            }
        }; 
        case 'end': {
            return {
                ...state,
                battle: false
            }
        };
        default:
        return state
    };
};

export {
    battleReducer,
    BattleActionType
}
