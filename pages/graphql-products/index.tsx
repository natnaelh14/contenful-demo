import React from 'react';
import { GetStaticProps } from 'next';
import ProductCard from '../../components/Product';
import { GraphQLClient, gql } from 'graphql-request';

export const getStaticProps: GetStaticProps = async (context) => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master`;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    },
  });

  const productsQuery = gql`
    {
      productReviewCollection {
        items {
          productId
          heading
          subheading
          image
          size
          price
        }
      }
    }
  `;

  const products = await graphQLClient.request(productsQuery);
  console.log(
    '🚀 ~ file: index.tsx:31 ~ GRAPHQL CONTENTFUL',
    JSON.stringify(products, undefined, 2)
  );

  return {
    props: {
      products: products?.productReviewCollection?.items,
    },
  };
};

const Products = ({ products }) => {
  return (
    <div className='mx-36 my-10'>
      <h1 className='text-center text-5xl font-bold'>Shoes</h1>
      <div className='flex flex-wrap'>
        {products.map((product) => {
          return <ProductCard key={product.productId} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
