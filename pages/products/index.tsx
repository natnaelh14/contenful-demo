import { GetStaticProps } from 'next';
import ProductCard from '../../components/Product';
import * as contentful from '../../utils/contentful';
import { getProducts } from '../../utils/products';

export const getStaticProps: GetStaticProps = async (context) => {
  const productsData = await getProducts(contentful.client);
  console.log(
    '🚀 ~ file: index.tsx:31 ~ RESTFUL CONTENTFUL',
    JSON.stringify(productsData, undefined, 2)
  );

  return {
    props: {
      products: productsData.items,
    },
  };
};

const Products = ({ products }) => {
  return (
    <div className='mx-36 my-10'>
      <h1 className='text-center text-5xl font-bold'>Shoes</h1>
      <div className='flex flex-wrap'>
        {products.map((product) => {
          return (
            <ProductCard
              key={product.fields.productId}
              product={product.fields}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;
