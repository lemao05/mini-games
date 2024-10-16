import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.svg';
import { useState, MouseEvent } from 'react';
import { Box, Popper } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useUser } from '../../store/store';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { login, balance, setIsAuth, isAuth } = useUser();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login');
      setIsAuth(false);
    });
  };

  return (
    <header className='bg-primary h-20 flex justify-between pr-6 items-center'>
      <Link to={isAuth ? '/games' : '/'}>
        <img src={logo} width={80} height={80} alt='logo' />
      </Link>
      {!isAuth ? (
        <Link to={'/login'}>
          <button className='text-white font-balsamiq'>Вход</button>
        </Link>
      ) : (
        <div className='font-balsamiq text-white text-end'>
          <p aria-describedby={id} onClick={handleClick}>
            {login}
          </p>
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            placement='bottom-end'
          >
            <Box
              sx={{
                p: 0.1,
                paddingInline: 2,
                bgcolor: 'white',
                borderRadius: 1,
              }}
            >
              <p
                onClick={handleSignOut}
                className='font-balsamiq text-end border-b'
              >
                Выйти
              </p>
              <Link
                to={'/deposit'}
                className='font-balsamiq text-end'
                onClick={() => setAnchorEl(null)}
              >
                <p>Пополнить баланс</p>
              </Link>
            </Box>
          </Popper>
          <p>балик: {balance}</p>
        </div>
      )}
    </header>
  );
}
