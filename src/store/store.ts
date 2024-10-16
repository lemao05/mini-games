import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { cards } from '../data/games.data';
import { ICard } from '../data/games.data';

interface IUser {
  login: string;
  isAuth: boolean;
  balance: number;
  alert: { type?: string; text?: string; isVisible: boolean };
  setLogin: (login: string) => void;
  setBalance: (balance: number) => void;
  setIsAuth: (isAuth: boolean) => void;
  setAlert: (isVisible: boolean, type?: string, text?: string) => void;
}

interface IDice {
  diceCondition: string;
  setDiceCondition: (condition: string) => void;
}

interface IBlackJack {
  player: {
    hand: ICard[];
    score: number;
  };
  dealer: {
    hand: ICard[];
    score: number;
  };
  deck: ICard[];
  isPlaying: boolean;
  isBusted: boolean;
  setIsBusted: (isBusted: boolean) => void;
  setDeck: (array: ICard[]) => void;
  setIsPlaying: (bool: boolean) => void;
  setPlayer: (hand: ICard[], score: number) => void;
  setDealer: (hand: ICard[], score: number) => void;
}

export const useUser = create<IUser>()(
  persist(
    (set, get) => ({
      login: 'smth',
      balance: 0,
      isAuth: false,
      alert: {
        type: '',
        text: '',
        isVisible: false,
      },
      setAlert: (isVisible, type?, text?) =>
        set({
          alert: {
            type: type,
            text: text,
            isVisible: isVisible,
          },
        }),
      setLogin: (login) => {
        set({ login: login });
      },
      setIsAuth: (isAuth) => set({ isAuth: isAuth }),
      setBalance: (balance) => {
        set({ balance: balance });
        const db = getDatabase();
        const myRef = ref(db, `users/${getAuth().currentUser?.uid}`);
        update(myRef, {
          balance: get().balance,
        });
      },
    }),
    { name: 'user-storage', storage: createJSONStorage(() => sessionStorage) }
  )
);

export const useDice = create<IDice>()(
  devtools(
    persist(
      (set) => ({
        diceCondition: '',
        setDiceCondition: (condition) => set({ diceCondition: condition }),
      }),
      { name: 'dice-storage', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

export const useBlackjack = create<IBlackJack>()(
  persist(
    (set) => ({
      player: {
        hand: [
          { name: '1B', value: 0 },
          { name: '1B', value: 0 },
        ],
        score: 0,
      },
      dealer: {
        hand: [
          { name: '1B', value: 0 },
          { name: '1B', value: 0 },
        ],
        score: 0,
      },
      deck: cards,
      isPlaying: false,
      isBusted: false,
      setIsBusted: (bool) => set({ isBusted: bool }),
      setDeck: (array) => set({ deck: array }),
      setIsPlaying: (bool) => set({ isPlaying: bool }),
      setPlayer: (hand, score) =>
        set({
          player: {
            hand: hand,
            score: score,
          },
        }),
      setDealer: (hand, score) =>
        set({
          dealer: {
            hand: hand,
            score: score,
          },
        }),
    }),
    {
      name: 'blackjack-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
