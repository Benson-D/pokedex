/**
 * Helper function that randomizes an array and returns a new set of an array
 * @param {Array} arr 
 * @returns {Array}
 */
const getPlayers = <T>(arr: T[], num: number): T[] => {
    const sortedPlayers = [...arr];

    return sortedPlayers.sort(() => 0.5 - Math.random()).splice(0, num);
}

/**
 * Selects random items from an array for two players
 * @param {Array} arr 
 * @returns {Array}
 */
function selectPlayers<T>(arr: T[]): T[][] {
    const playerOne = getPlayers(arr, 5);
    const playerTwo = getPlayers(arr, 5);

    return [playerOne, playerTwo];
};

export { selectPlayers };