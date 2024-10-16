interface IGames {
  name: string;
  imgUrl: string;
  link: string;
}

export interface ICard {
  name: string;
  value: number;
}

export const games: IGames[] = [
  {
    name: 'Кубики',
    imgUrl: '/dice.png',
    link: 'dice',
  },
  {
    name: 'Blackjack',
    imgUrl: '/blackjack.png',
    link: 'blackjack',
  },
];

export const diceConditions: string[] = [
  '> 4',
  '< 8',
  '> 5',
  '< 7',
  '> 6',
  '< 6',
];

export const betAmount: string[] = ['10%', '25%', '50%', '100%'];

export const cards: ICard[] = [
  {
    name: '2S',
    value: 2,
  },
  {
    name: '2H',
    value: 2,
  },
  {
    name: '2D',
    value: 2,
  },
  {
    name: '2C',
    value: 2,
  },
  {
    name: '3S',
    value: 3,
  },
  {
    name: '3H',
    value: 3,
  },
  {
    name: '3D',
    value: 3,
  },
  {
    name: '3C',
    value: 3,
  },
  {
    name: '4S',
    value: 4,
  },
  {
    name: '4H',
    value: 4,
  },
  {
    name: '4D',
    value: 4,
  },
  {
    name: '4C',
    value: 4,
  },
  {
    name: '5S',
    value: 5,
  },
  {
    name: '5H',
    value: 5,
  },
  {
    name: '5D',
    value: 5,
  },
  {
    name: '5C',
    value: 5,
  },
  {
    name: '6S',
    value: 6,
  },
  {
    name: '6H',
    value: 6,
  },
  {
    name: '6D',
    value: 6,
  },
  {
    name: '6C',
    value: 6,
  },
  {
    name: '7S',
    value: 7,
  },
  {
    name: '7H',
    value: 7,
  },
  {
    name: '7D',
    value: 7,
  },
  {
    name: '7C',
    value: 7,
  },
  {
    name: '8S',
    value: 8,
  },
  {
    name: '8H',
    value: 8,
  },
  {
    name: '8D',
    value: 8,
  },
  {
    name: '8C',
    value: 8,
  },
  {
    name: '9S',
    value: 9,
  },
  {
    name: '9H',
    value: 9,
  },
  {
    name: '9D',
    value: 9,
  },
  {
    name: '9C',
    value: 9,
  },
  {
    name: 'TS',
    value: 10,
  },
  {
    name: 'TH',
    value: 10,
  },
  {
    name: 'TD',
    value: 10,
  },
  {
    name: 'TC',
    value: 10,
  },
  {
    name: 'JS',
    value: 10,
  },
  {
    name: 'JH',
    value: 10,
  },
  {
    name: 'JD',
    value: 10,
  },
  {
    name: 'JC',
    value: 10,
  },
  {
    name: 'QS',
    value: 10,
  },
  {
    name: 'QH',
    value: 10,
  },
  {
    name: 'QD',
    value: 10,
  },
  {
    name: 'QC',
    value: 10,
  },
  {
    name: 'KS',
    value: 10,
  },
  {
    name: 'KH',
    value: 10,
  },
  {
    name: 'KD',
    value: 10,
  },
  {
    name: 'KC',
    value: 10,
  },
  {
    name: 'AS',
    value: 11,
  },
  {
    name: 'AH',
    value: 11,
  },
  {
    name: 'AD',
    value: 11,
  },
  {
    name: 'AC',
    value: 11,
  },
];
