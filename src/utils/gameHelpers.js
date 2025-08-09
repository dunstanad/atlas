import places from "../data/places.json";

// Helper: Check if a string starts with A-Z (English letter)
function isValidStartLetter(str) {
  return /^[A-Z]$/i.test(str[0]);
}

// Helper: Check if string ends with a-z (English letter)
function isValidEndLetter(str) {
  return /[a-z]$/i.test(str.slice(-1));
}

// Pick a random valid letter key (A-Z) from places data that has entries
export function getValidLetterKeys(data) {
  return Object.keys(data).filter(key => /^[A-Z]$/.test(key) && data[key].length > 0);
}

// Pick a random letter key (A-Z) that has at least one valid word
export function getRandomValidLetter(data) {
  const keys = getValidLetterKeys(data);
  if (keys.length === 0) return null;
  return keys[Math.floor(Math.random() * keys.length)];
}

// Pick a random valid word for the starting letter, unused, with end letter a-z
export function pickValidWordForLetter(startLetter, usedWords, data) {
  const candidates = (data[startLetter] || []).filter(word => {
    const lower = word.toLowerCase();
    return (
      !usedWords.has(lower) &&
      isValidStartLetter(word) &&
      isValidEndLetter(word)
    );
  });

  if (candidates.length === 0) return null;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

// Pick a random valid word from entire data, used for first computer word
export function getRandomValidWord(data, usedWords) {
  const keys = getValidLetterKeys(data);
  for (let i = 0; i < 100; i++) { // max 100 attempts
    const letter = keys[Math.floor(Math.random() * keys.length)];
    const word = pickValidWordForLetter(letter, usedWords, data);
    if (word) return word;
  }
  return null;
}

// Validate player's input word for lastChar and unused & English letters & exists
export function validateWord(input, lastChar, usedWords, data) {
  if (!input) return false;
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  if (usedWords.has(lower)) return false;
  if (!isValidStartLetter(trimmed)) return false;
  if (trimmed[0].toLowerCase() !== lastChar.toLowerCase()) return false;

  const validList = data[trimmed[0].toUpperCase()] || [];
  return validList.some(name => name.toLowerCase() === lower && isValidEndLetter(name));
}
