import { getInputLines, readInputAsString } from "../../lib/helper";
import { countCardsWinningNumbers, readCardData } from "./#1";



function sumMultiplyingCards(cards: string[]) {
    const cardCountMap = new Map();

    function processCard(card: string, cardIndex: number) {
        const [winning, owned] = readCardData(card);
        const winCount = countCardsWinningNumbers(winning, owned);
        for (let i = cardIndex + 1; i <= cardIndex + winCount; i++) {
            const prevValue = cardCountMap.get(i) || 0;
            cardCountMap.set(i, prevValue + 1);
        }
    }
    let total = 0;
    let i = 0;
    while (i < cards.length) {
        total++;
        const cardToProcess = cards[i];
        processCard(cardToProcess, i);
        const currentCardCopies = cardCountMap.get(i) || 0;
        if (currentCardCopies > 0) {
            cardCountMap.set(i, currentCardCopies - 1);
            continue;
        }
        i++;
    }
    return total;
}

if (process.env.NODE_ENV !== 'test') {
    const input = getInputLines(readInputAsString(__dirname));
    const result = sumMultiplyingCards(input);
    console.log(result);
}

export {
    sumMultiplyingCards
};
