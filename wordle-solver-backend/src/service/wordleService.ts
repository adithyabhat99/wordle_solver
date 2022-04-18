import { WordleRequest } from "../models/WordleRequest";
import originalWords from "../data/words";

class WordleService {
  getProbableResults = (wordleRequest: WordleRequest): string[] => {
    // deepcopy words
    let words: string[] = originalWords.map((word) => word);
    words = words.filter((word) => {
      if (wordleRequest.present.length === 0) {
        return true;
      }
      return wordleRequest.notPresent.find((notPresent) => {
        return word.indexOf(notPresent) === -1;
      });
    });
    words = words.filter((word) => {
      if (wordleRequest.present.length === 0) {
        return true;
      }
      let allPresent = true;
      wordleRequest.present.map((present) => {
        if (word.indexOf(present.letter) === -1) {
          allPresent = false;
          return;
        }
        if (
          wordleRequest.strict !== false &&
          present.positions.indexOf(-1) === -1 &&
          present.positions.indexOf(word.indexOf(present.letter)) === -1
        ) {
          allPresent = false;
          return;
        }
      });
      return allPresent;
    });
    return words.length > 100 ? words.slice(0, 100) : words;
  };
}

export default WordleService;
