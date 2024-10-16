import Button from '../Button';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { MouseEvent, useState } from 'react';
import { useUser } from '../../store/store';

import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Form() {
  const { setBalance, setLogin, setIsAuth, setAlert } = useUser();
  const [userData, setUserData] = useState({
    login: '',
    email: '',
    password: '',
    confirmedPassword: '',
    error: '',
  });

  const path = useLocation().pathname;
  const navigate = useNavigate();

  const checkPasswords = () => {
    if (userData.password !== userData.confirmedPassword) {
      setUserData((prev) => ({ ...prev, error: 'пароли не совпадают' }));
      return false;
    } else setUserData((prev) => ({ ...prev, error: '' }));
    return true;
  };

  const handleSignUp = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!checkPasswords()) return;
    const auth = getAuth();
    const email = userData.email;
    const password = userData.password;
    const login = userData.login;
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        if (auth.currentUser)
          updateProfile(auth.currentUser, { displayName: login });
        set(ref(getDatabase(), 'users/' + data.user.uid), {
          login: login,
          balance: 0,
        });
        setLogin(login);
        setBalance(1000);
        setIsAuth(true);
        navigate('/games');
        console.log(data);
      })
      .catch((error) => {
        console.error({ error });
        switch (error.code) {
          case 'auth/invalid-email':
            setAlert(true, 'error', 'Недействительная почта');
            break;
          case 'auth/weak-password':
            setAlert(true, 'error', 'Минимальная длина пароля - 6 символов');
            break;
        }
      });
  };

  const handleLogIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const auth = getAuth();
    const email = userData.email;
    const password = userData.password;
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data);
        const auth = getAuth();
        const login = auth.currentUser?.displayName;
        setLogin(login as string);
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${auth.currentUser?.uid}`))
          .then((snapshot) => {
            const balance = snapshot.val().balance;
            setBalance(balance);
            setIsAuth(true);
          })
          .catch((err) => console.error(err));
        navigate('/games');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className='flex flex-col w-3/4 gap-5 bg-white p-5 mt-10 rounded-xl'>
      {path === '/signup' && (
        <input
          autoComplete='username'
          type='text'
          name='login'
          placeholder='login'
          className='bg-input p-1 rounded text-lg font-balsamiq'
          value={userData.login}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, login: e.target.value }))
          }
        />
      )}
      <input
        type='email'
        name='email'
        autoComplete='username'
        placeholder='email'
        className='bg-input p-1 rounded text-lg font-balsamiq'
        value={userData.email}
        onChange={(e) =>
          setUserData((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        autoComplete='new-password'
        type='password'
        name='password'
        placeholder='password'
        className='bg-input p-1 rounded text-lg font-balsamiq'
        value={userData.password}
        onChange={(e) =>
          setUserData((prev) => ({ ...prev, password: e.target.value }))
        }
        onKeyUp={checkPasswords}
      />
      {path === '/signup' && (
        <div>
          <input
            autoComplete='new-password'
            type='password'
            name='confirmedPassword'
            placeholder='confirm password'
            className='bg-input p-1 rounded text-lg font-balsamiq w-full'
            value={userData.confirmedPassword}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                confirmedPassword: e.target.value,
              }))
            }
            onKeyUp={checkPasswords}
          />
          {userData.error && (
            <p className='text-red-500 font-balsamiq font-bold text-center'>
              {userData.error}
            </p>
          )}
        </div>
      )}
      {path === '/signup' ? (
        <Button handleClick={handleSignUp} title='Зарегистрироваться' />
      ) : (
        <div className='flex justify-between items-center'>
          <Link to={'/signup'}>
            <p className='font-balsamiq underline'>Нет аккаунта</p>
          </Link>
          <Button handleClick={handleLogIn} title='Войти' />
        </div>
      )}
    </form>
  );
}
