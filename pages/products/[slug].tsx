import { GetStaticProps } from 'next';
import PreviewBanner from '../../components/PreviewBanner';
import * as contentful from '../../utils/contentful';
import { getProduct, getProducts } from '../../utils/products';
import ProductCard from '../../components/Product';
import { ProductProps } from '../../types';
import { useRouter } from 'next/router';

export const getStaticProps: GetStaticProps = async (context) => {
  const { preview, params } = context;
  const client = preview ? contentful.previewClient : contentful.client;
  // @ts-ignore
  const product = await getProduct(client, params?.slug);

  return {
    props: {
      preview: context.preview || false,
      error: !product.items.length,
      product: product?.items[0]?.fields || null,
    },
  };
};

export async function getStaticPaths() {
  const products = await getProducts(contentful.client);
  const paths = products.items.map((entry) => ({
    params: {
      slug: entry?.fields?.productId,
    },
  }));
  return {
    fallback: false,
    paths,
  };
}

const Product = ({
  product,
  error,
  preview,
}: {
  product: ProductProps;
  error: boolean;
  preview: boolean;
}) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/products');
  };

  if (error) return <h1>Error Ocurred. Try Again.</h1>;
  return (
    <div className='mx-36 my-10'>
      {preview && <PreviewBanner />}
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5'
        onClick={handleClick}
      >
        Back
      </button>
      <div className='flex items-center justify-center'>
        <ProductCard key={product.productId} product={product} />
      </div>
    </div>
  );
};

export default Product;
