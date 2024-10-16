import { useRef, useState, MouseEvent } from 'react';
import './games.css';
import anime from 'animejs';
import RadioInput from '../inputs/RadioInput';
import { useDice } from '../../store/store';
import { useUser } from '../../store/store';
import { diceConditions } from '../../data/games.data';
import BetInput from '../inputs/BetInput';

export default function Dice() {
  const [rolls, setRolls] = useState([1, 1]);
  const { balance, setBalance, setAlert } = useUser();
  const { setDiceCondition, diceCondition } = useDice();
  const diceRefs = useRef([] as React.RefObject<HTMLDivElement>[]);

  const win = (bet: number) => {
    switch (diceCondition) {
      case '> 4':
        bet = bet * 0.2;
        break;
      case '> 5':
        bet = bet * 0.38;
        break;
      case '> 6':
        bet = bet * 0.71;
        break;
      case '< 6':
        bet = bet * 1.4;
        break;
      case '< 7':
        bet = bet * 0.71;
        break;
      case '< 8':
        bet = bet * 0.38;
        break;
    }
    setBalance(balance + bet);
    setAlert(true, 'success', `Вы выиграли ${bet}`);
  };

  const lose = (bet: number) => {
    setBalance(balance - bet);
    setAlert(true, 'error', `Вы проиграли ${bet}`);
  };

  const handleBetClick = (_e: MouseEvent<HTMLButtonElement>, bet: number) => {
    if (diceCondition === '') {
      setAlert(true, 'error', 'Выберите условие');
      return;
    } else {
      const firstRoll = Math.ceil(Math.random() * 6);
      const secondRoll = Math.ceil(Math.random() * 6);
      diceRefs.current.forEach((diceRef) => {
        anime({
          targets: diceRef.current,
          opacity: [0, 1],
          duration: 1000,
          easing: 'easeInSine',
        });
      });
      setRolls([firstRoll, secondRoll]);
      const sumRoll = firstRoll + secondRoll;
      switch (diceCondition) {
        case '> 4':
          sumRoll > 4 ? win(bet) : lose(bet);
          break;
        case '> 5':
          sumRoll > 5 ? win(bet) : lose(bet);
          break;
        case '> 6':
          sumRoll > 6 ? win(bet) : lose(bet);
          break;
        case '< 6':
          sumRoll < 6 ? win(bet) : lose(bet);
          break;
        case '< 7':
          sumRoll < 7 ? win(bet) : lose(bet);
          break;
        case '< 8':
          sumRoll < 8 ? win(bet) : lose(bet);
          break;
      }
    }
  };

  const handleChange = (id: string) => {
    setDiceCondition(id);
  };

  return (
    <>
      <section className='flex gap-10 mt-10'>
        {rolls.map((dice, i) => (
          <div
            ref={(el) => (diceRefs.current[i] = { current: el })}
            key={i}
            className='dice'
          >
            {dice === 1 ? (
              <div className='big-dot row-start-2 col-start-2'></div>
            ) : dice === 2 ? (
              <>
                <div className='row-start-2 ml-10 small-dot'></div>
                <div className='row-start-2 mr-10 col-start-3 small-dot'></div>
              </>
            ) : dice === 3 ? (
              <>
                <div className='col-start-3 mt-5 mr-5 small-dot'></div>
                <div className='row-start-2 col-start-2 small-dot'></div>
                <div className='row-start-3 ml-5 mb-5 small-dot'></div>
              </>
            ) : dice === 4 ? (
              <>
                <div className='small-dot mt-7 ml-7'></div>
                <div className='col-start-3 small-dot mt-7 mr-7'></div>
                <div className='row-start-3 small-dot mb-7 ml-7'></div>
                <div className='row-start-3 col-start-3 small-dot mb-7 mr-7'></div>
              </>
            ) : dice === 5 ? (
              <>
                <div className='small-dot mt-5 ml-5'></div>
                <div className='col-start-3 small-dot mt-5 mr-5'></div>
                <div className='col-start-2 row-start-2 small-dot'></div>
                <div className='row-start-3 small-dot mb-5 ml-5'></div>
                <div className='row-start-3 col-start-3 small-dot mb-5 mr-5'></div>
              </>
            ) : dice === 6 ? (
              <>
                <div className='small-dot mt-5 ml-5'></div>
                <div className='small-dot col-start-3 mt-5 mr-5'></div>
                <div className='small-dot row-start-2 ml-5'></div>
                <div className='small-dot row-start-2 col-start-3 mr-5'></div>
                <div className='small-dot row-start-3 ml-5 mb-5'></div>
                <div className='small-dot row-start-3 col-start-3 mb-5 mr-5'></div>
              </>
            ) : null}
          </div>
        ))}
      </section>
      <BetInput handleClick={handleBetClick} />
      <section className='grid grid-cols-2 gap-x-16 gap-y-3 mt-10'>
        {diceConditions.map((condition) => (
          <RadioInput
            key={condition}
            title={condition}
            id={condition}
            handleChange={handleChange}
            condition={diceCondition}
          />
        ))}
      </section>
    </>
  );
}
