export const compareArray = (a, b) => {
    if (a.length !== b.length) return false;
  
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
  
    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
}

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}