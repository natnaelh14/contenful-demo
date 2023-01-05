import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <Link href={`products/${product.productId}`}>
      <div className='max-w-sm rounded overflow-hidden shadow-lg mx-10 my-5 hover:cursor-pointer'>
        <Image
          width={200}
          height={200}
          className='w-full'
          src={product.image}
          alt='Sunset in the mountains'
        />
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{product.heading}</div>
          <p className='text-gray-700 text-base mb-2'>{product.subheading}</p>
          <p>
            <span className='font-bold'>Price: </span>${product.price}
          </p>
          <p>
            <span className='font-bold'>Size: </span>
            {product.size}
          </p>
        </div>
        <div className='flex justify-center'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
            Add to Cart
          </button>
        </div>
        <div className='mt-2 first-letter:px-6 pt-4 pb-2 flex justify-center'>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            #jordon
          </span>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            #nike
          </span>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            #basketball
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
