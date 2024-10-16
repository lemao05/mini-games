import { useUser } from '../../store/store';
import Button from '../Button';
import { useState } from 'react';

export default function Deposit() {
  const [value, setValue] = useState('');
  const { setBalance, balance, setAlert } = useUser();

  const handleClick = () => {
    if (value === 'ТЫСЯЧА') {
      setBalance(balance + 1000);
      setAlert(true, 'success', 'На ваш счет зачислена 1000');
    } else {
      setAlert(true, 'error', 'Промокода не существует');
    }
  };

  return (
    <section className='flex gap-5 mt-7'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
        placeholder='Введите промокод'
        className='font-balsamiq pl-1 rounded'
      />
      <Button title='Применить' handleClick={handleClick} />
    </section>
  );
}
