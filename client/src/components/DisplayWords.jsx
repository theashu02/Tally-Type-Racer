// Function to get words typed correctly by the player
const getTypedWords = (words, player) => {
  const typedWords = words.slice(0, player.currentWordIndex).join(" ");
  return <span className="bg-green-400 p-1 rounded">{typedWords} </span>;
};

// Function to get the current word the player is typing
const getCurrentWord = (words, player) => {
  const currentIndex = player.currentWordIndex;
  // Check if currentIndex is within bounds
  if (currentIndex < words.length) {
    return <span className="underline font-bold">{words[currentIndex]}</span>;
  }
  return null;
};

// Function to get the remaining words to be typed
const getWordsToBeTyped = (words, player) => {
  const wordsToBeTyped = words.slice(player.currentWordIndex + 1).join(" ");
  return <span>{wordsToBeTyped}</span>;
};

const DisplayWords = ({ words, player }) => {
  // Ensure player and words are valid
  if (!player || !words || words.length === 0) {
    return null;
  }

  return (
    <div className="text-lg leading-relaxed">
      {getTypedWords(words, player)}
      {getCurrentWord(words, player)}
      {getWordsToBeTyped(words, player)}
    </div>
  );
};

export default DisplayWords;
