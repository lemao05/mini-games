import { Link } from 'react-router-dom';
import { games } from '../../data/games.data';

export default function Games() {
  return (
    <div className='flex flex-col gap-5'>
      {games.map((game) => {
        return (
          <Link key={game.name} to={game.link}>
            <div className='relative flex items-center flex-col'>
              <img className='rounded-xl' src={game.imgUrl} alt={game.name} />
              <p className='font-balsamiq text-white absolute bottom-0'>
                {game.name}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
