import { useEffect, useRef } from 'react';
import { useUser } from '../store/store';
import anime from 'animejs';

export default function Alert() {
  const { alert, setAlert } = useUser();
  const alertRef = useRef(null);

  useEffect(() => {
    if (alert.isVisible) {
      anime({
        targets: alertRef.current,
        opacity: [0, 1],
        translateY: ['-100%', '20%', '-20%', '0'],
        duration: 600,
        delay: 200,
        easing: 'linear',
      });
    }

    const timer = setTimeout(() => {
      setAlert(false);
    }, 1750);
    return () => {
      clearTimeout(timer);
    };
  }, [alert.isVisible]);

  return (
    <>
      {alert.isVisible && (
        <p
          ref={alertRef}
          className={`absolute font-balsamiq top-20 w-full text-white py-1 px-2 text-lg
            ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'}
            `}
        >
          {alert.text}
        </p>
      )}
    </>
  );
}
