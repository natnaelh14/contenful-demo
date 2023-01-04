import React from 'react';
import { client } from '../utils/contentful';

export async function getStaticProps() {
  const product = await client.getEntry('5mNhkvtQeABhDbFrnxGnwr');
  console.log('🚀 ~ file: product1.tsx:6 ~ getStaticProps ~ product', product);

  return {
    props: {
      heading: product.fields.heading,
      subheading: product.fields.subheading,
      productId: product.fields.productId,
    }, // will be passed to the page component as props
  };
}

const ProductPage = ({
  heading,
  subheading,
  productId,
}: {
  heading: string;
  subheading: string;
  productId: string;
}) => {
  return (
    <div>
      <h1>{heading}</h1>
      <h2>{subheading}</h2>
      <p>{productId}</p>
    </div>
  );
};

export default ProductPage;
