import { ICard } from '../../../data/games.data';

export function getRandomCardAndFilterDeck(
  array: ICard[],
  callback: (arr: ICard[]) => void
) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomCard = array[randomIndex];
  const filteredDeck = array.filter((_el, i) => i !== randomIndex);
  callback(filteredDeck);
  return randomCard;
}

export function sumScore(hand: ICard[]): number {
  let total = hand.reduce((acc, card) => {
    return acc + card.value;
  }, 0);
  let aceCount = hand.filter((card) => card.name.startsWith('A')).length;

  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }
  return total;
}
