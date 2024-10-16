export default function Footer() {
  return (
    <footer className='bg-primary h-10'>
      <p className='text-center leading-10 font-balsamiq text-white font-bold'>
        <span className='font-normal'>&#169; </span>
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
