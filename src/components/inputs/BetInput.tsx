import { MouseEvent, useState } from 'react';
import Button from '../Button';
import { betAmount } from '../../data/games.data';
import { useUser } from '../../store/store';

interface IProps {
  handleClick: (e: MouseEvent<HTMLButtonElement>, bet: number) => void;
}

export default function BetInput({ handleClick }: IProps) {
  const [bet, setBet] = useState(0);
  const { balance, setAlert } = useUser();

  const setBetAmount = (percentage: string) => {
    setBet((balance * +percentage.replace('%', '')) / 100);
  };

  return (
    <section>
      <div className='mt-10 flex gap-5'>
        <input
          className='font-balsamiq rounded pl-1 grow appearance-none'
          placeholder={bet ? '' : 'place your bet'}
          type='number'
          value={bet === 0 ? '' : bet}
          onChange={(e) => setBet(() => Number(e.target.value))}
          name='bet'
        />
        <Button
          title='Bet'
          handleClick={(e) => {
            if (bet <= 0) {
              setAlert(true, 'error', 'низкая ставка');
              return;
            } else if (bet > balance) {
              setAlert(true, 'error', 'сумма ставки выше баланса');
              return;
            }
            handleClick(e, bet);
          }}
        />
      </div>
      <div className='flex gap-2 mt-3'>
        {betAmount.map((el) => (
          <Button key={el} title={el} handleClick={() => setBetAmount(el)} />
        ))}
      </div>
    </section>
  );
}
