/**
 * Helper function that randomizes an array and return the first three items
 * @param arr 
 * @returns {Array}
 */
const getThreePlayers = <T>(arr: T[]): T[] => {
    return arr.sort(() => 0.5 - Math.random()).splice(0, 3);
}

/**
 * Select three random items for an individual player
 * @param arr 
 * @returns 
 */
function selectPlayers<T>(arr: T[]): T[][] {
    const playerOne = getThreePlayers(arr);
    const playerTwo = getThreePlayers(arr);

    return [playerOne, playerTwo];
};

export { selectPlayers };