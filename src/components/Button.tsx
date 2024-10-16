import { MouseEvent } from 'react';

interface IProps {
  title: string;
  handleClick: (e: MouseEvent<HTMLButtonElement>, bet?: number) => void;
}

export default function Button({ title, handleClick }: IProps) {
  return (
    <button
      onClick={handleClick}
      className='bg-button text-white font-balsamiq w-fit self-end px-3 py-1 rounded text-lg'
    >
      {title}
    </button>
  );
}
