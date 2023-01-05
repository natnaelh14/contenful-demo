import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className='mt-20 text-center font-bold text-5xl'>Home Page</h1>
      <div className='flex justify-center mt-10'>
        <Link
          href='/products'
          className='text-2xl text-blue-600 hover:font-bold hover:cursor-pointer'
        >
          Products
        </Link>
      </div>
    </div>
  );
}
