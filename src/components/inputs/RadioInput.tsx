import './input.css';

interface IProps {
  title: string;
  handleChange: (id: string) => void;
  id: string;
  condition: string;
}

export default function RadioInput({
  title,
  id,
  handleChange,
  condition,
}: IProps) {
  return (
    <>
      <input
        className='checked:bg-red-800 hidden'
        type='radio'
        id={id}
        checked={condition === id}
        onChange={() => handleChange(id)}
      />
      <label
        className='font-balsamiq text-2xl text-blue-400 bg-white py-1 px-3 rounded'
        htmlFor={id}
      >
        {title}
        <span>
          {title === '> 4'
            ? ' (1.2x)'
            : title === '> 5'
            ? ' (1.38x)'
            : title === '> 6'
            ? ' (1.71x)'
            : title === '< 6'
            ? ' (2.40x)'
            : title === '< 7'
            ? ' (1.71x)'
            : ' (1.38x)'}
        </span>
      </label>
    </>
  );
}
