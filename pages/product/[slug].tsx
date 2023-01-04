import { GetStaticProps } from 'next';
import React from 'react';
import { client } from '../../utils/contentful';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await client.getEntries({
    content_type: 'productReview',
    'fields.productId': params?.slug,
    limit: 1,
  });
  console.log(
    '🚀 ~ file: [[...slug]].tsx:10 ~ getServerSideProps ~ params.slug',
    params?.slug
  );
  console.log(
    '🚀 ~ file: [[...slug]].tsx:8 ~ getServerSideProps ~ product',
    product
  );

  return {
    props: {
      error: !product.items.length,
      // @ts-ignore
      heading: product?.items[0]?.fields?.heading || '',
      // @ts-ignore
      subheading: product?.items[0]?.fields?.subheading || '',
      // @ts-ignore
      productId: product?.items[0]?.fields?.productId || '',
    },
  };
};

export async function getStaticPaths() {
  const products = await client.getEntries({
    content_type: 'productReview',
  });
  const paths = products.items.map((entry) => ({
    params: {
      // @ts-ignore
      slug: entry?.fields?.productId,
    },
  }));
  return {
    fallback: false,
    paths,
  };
}

const Product = ({
  heading,
  subheading,
  productId,
  error,
}: {
  heading: string;
  subheading: string;
  productId: string;
  error: boolean;
}) => {
  if (error) return <h1>Error Ocurred. Try Again.</h1>;
  return (
    <div>
      <h1>{heading}</h1>
      <h2>{subheading}</h2>
      <p>{productId}</p>
    </div>
  );
};

export default Product;
