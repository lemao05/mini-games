import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import './firebase.ts';
import MainPage from './pages/MainPage.tsx';
import Form from './components/form/Form.tsx';
import Games from './components/games/GameList.tsx';
import Dice from './components/games/Dice.tsx';
import BlackJack from './components/games/blackjack/Blackjack.tsx';
import Deposit from './components/form/Deposit.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <p>такой страницы нет</p>,
    children: [
      {
        path: '/signup',
        element: <Form />,
      },
      {
        path: '/login',
        element: <Form />,
      },
      {
        path: '/deposit',
        element: <Deposit />,
      },
      {
        path: '/games',
        element: <Games />,
      },
      {
        path: '/games/dice',
        element: <Dice />,
      },
      {
        path: '/games/blackjack',
        element: <BlackJack />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
