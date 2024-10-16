import { MouseEvent, useState, Suspense } from 'react';
import BetInput from '../../inputs/BetInput';
import Card from './Cards';
import { useBlackjack, useUser } from '../../../store/store';
import { getRandomCardAndFilterDeck, sumScore } from './blackjack.utils';
import { cards } from '../../../data/games.data';
import Button from '../../Button';

export default function BlackJack() {
  const {
    deck,
    setIsPlaying,
    isPlaying,
    dealer,
    player,
    setPlayer,
    setDealer,
    setDeck,
    isBusted,
    setIsBusted,
  } = useBlackjack();
  const { setBalance, balance, setAlert } = useUser();
  const [bet, setBet] = useState(0);

  const handleBetClick = (_e: MouseEvent<HTMLButtonElement>, bet: number) => {
    setIsBusted(false);
    setIsPlaying(true);
    setBalance(balance - bet);
    setBet(bet);
    let currentDeck = structuredClone(deck);

    const playerHand = [
      getRandomCardAndFilterDeck(
        currentDeck,
        (filteredDeck) => (currentDeck = filteredDeck)
      ),
      getRandomCardAndFilterDeck(
        currentDeck,
        (filteredDeck) => (currentDeck = filteredDeck)
      ),
    ];

    const dealerHand = [
      getRandomCardAndFilterDeck(
        currentDeck,
        (filteredDeck) => (currentDeck = filteredDeck)
      ),
      { name: '1B', value: 0 },
    ];

    setDealer(dealerHand, sumScore(dealerHand));
    setPlayer(playerHand, sumScore(playerHand));
    setDeck(currentDeck);
    if (sumScore(playerHand) === 21) {
      setAlert(true, 'success', `Блекджек! Вы выиграли ${bet * 1.5}`);
      setBalance(balance + bet * 1.5);
      setIsBusted(true);
    }
  };

  const handleMoreClick = () => {
    const randomCard = getRandomCardAndFilterDeck(deck, setDeck);
    const playerHand = [...structuredClone(player.hand), randomCard];
    const score = sumScore(playerHand);
    setPlayer(playerHand, score);
    if (score > 21) {
      setAlert(true, 'error', 'Перебор вы проиграли');
      setIsBusted(true);
    }
  };

  const handleStopClick = () => {
    let currentDealerScore = dealer.score;
    while (currentDealerScore < 17) {
      const randomCard = getRandomCardAndFilterDeck(deck, setDeck);
      const newDealerHand = structuredClone(dealer.hand);
      if (newDealerHand[1].name === '1B') newDealerHand[1] = randomCard;
      if (sumScore(newDealerHand) >= 17) {
        currentDealerScore = sumScore(newDealerHand);
        setDealer(newDealerHand, currentDealerScore);
        break;
      }
      newDealerHand.push(getRandomCardAndFilterDeck(deck, setDeck));
      currentDealerScore = sumScore(newDealerHand);
      setDealer(newDealerHand, currentDealerScore);
    }
    if (currentDealerScore > 21) {
      setAlert(true, 'success', `Вы выиграли ${bet}, у дилера перебор`);
      setBalance(balance + bet * 2);
    } else if (currentDealerScore > player.score) {
      setAlert(true, 'error', `Вы проиграли ${bet}`);
    } else if (currentDealerScore < player.score) {
      setAlert(true, 'success', `Вы выиграли ${bet}`);
      setBalance(balance + bet * 2);
    } else {
      setAlert(true, 'success', `Ничья`);
      setBalance(balance + bet);
    }
    setIsBusted(true);
  };

  return (
    <>
      <section className='flex flex-col gap-16 w-full relative overflow-hidden mt-5'>
        <div>
          <div className='h-40'>
            {dealer.hand.map((card, i) => (
              <Suspense key={i}>
                <Card card={card.name} i={i} />
              </Suspense>
            ))}
          </div>
          <p className='font-balsamiq text-center'>Dealer: {dealer.score}</p>
        </div>
        <img
          src='/cards/1B.svg'
          className='h-40 rotate-90 absolute -right-16 top-36'
          alt='q'
        />
        <img
          src='/cards/1B.svg'
          className='h-40 rotate-90 absolute -right-16 top-35'
          alt='q'
        />
        <img
          src='/cards/1B.svg'
          className='h-40 rotate-90 absolute -right-16 top-34'
          alt='q'
        />
        <div>
          <div className='h-40'>
            {player.hand.map((card, i) => (
              <Suspense key={i}>
                <Card card={card.name} i={i} />
              </Suspense>
            ))}
          </div>
          <p className='font-balsamiq text-center'>Player: {player.score}</p>
        </div>
      </section>
      {isPlaying ? (
        <section className='flex gap-5 mt-10'>
          {!isBusted ? (
            <>
              <button
                onClick={handleMoreClick}
                className='bg-green-700 text-white font-balsamiq w-fit self-end px-3 py-1 rounded text-lg'
              >
                Еще
              </button>
              <button
                onClick={handleStopClick}
                className='bg-red-700 text-white font-balsamiq w-fit self-end px-3 py-1 rounded text-lg'
              >
                Стоп
              </button>
            </>
          ) : (
            <Button
              title='Заново'
              handleClick={() => {
                setDeck(cards);
                setIsPlaying(false);
                setDealer(
                  [
                    { name: '1B', value: 0 },
                    { name: '1B', value: 0 },
                  ],
                  0
                );
                setPlayer(
                  [
                    { name: '1B', value: 0 },
                    { name: '1B', value: 0 },
                  ],
                  0
                );
              }}
            />
          )}
        </section>
      ) : (
        <BetInput handleClick={handleBetClick} />
      )}
    </>
  );
}
