import { PokeStats } from "../interface/pokeInterface";

/**
 * Helper function that randomizes an array and returns a new set of an array
 * @param {Array} arr
 * @returns {Array}
 */
const getPlayers = <T>(arr: T[], num: number): T[] => {
  const sortedPlayers = [...arr];

  return sortedPlayers.sort(() => 0.5 - Math.random()).splice(0, num);
};

/**
 * Selects random items from an array for two players
 * @param {Array} arr
 * @returns {Array}
 */
function selectPlayers<T>(arr: T[]): T[][] {
  const playerOne = getPlayers(arr, 5);
  const playerTwo = getPlayers(arr, 5);

  return [playerOne, playerTwo];
}

/**
 * Helper function that determine the total base experience of each pokemon
 * @param {Array} arr
 * @returns
 */
const getExperienceTotal = (arr: PokeStats[]): number =>
  arr.reduce((acc, pokemon) => acc + Number(pokemon.experience), 0);

/**
 * Determines a players total based experience of pokemon,
 * returns a winners results
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns
 */
function determineWinner(arr1: PokeStats[], arr2: PokeStats[]): string {
  const playerOneResults = getExperienceTotal(arr1);
  const playerTwoResults = getExperienceTotal(arr2);

  return playerOneResults > playerTwoResults ? "player 1" : "player 2";
}

export { selectPlayers, determineWinner };
