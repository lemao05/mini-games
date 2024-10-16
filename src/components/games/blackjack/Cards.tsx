interface IProps {
  card: string;
  i: number;
}

export default function Card({ card, i }: IProps) {
  return (
    <img
      className={`absolute ${
        i === 0
          ? 'left-20 z-0'
          : i === 1
          ? 'left-25 z-10'
          : i === 2
          ? 'left-30 z-20'
          : i === 3
          ? 'left-35 z-30'
          : i === 4
          ? 'left-40 z-40'
          : 'left-45 z-50'
      } h-40 `}
      key={i}
      src={`/cards/${card}.svg`}
      alt={card}
    />
  );
}
