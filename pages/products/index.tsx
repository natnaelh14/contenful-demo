import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import ProductCard from '../../components/Product';
import * as contentful from '../../utils/contentful';
import { getArticles, getProducts } from '../../utils/products';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

export const getStaticProps: GetStaticProps = async (context) => {
  const productsData = await getProducts(contentful.client);

  // const articles = await getArticles(contentful.client);
  // console.log(
  //   '🚀 ~ file: index.tsx:12 ~ constgetStaticProps:GetStaticProps= ~ articles:',
  //   JSON.stringify(articles, undefined, 2)
  // );
  return {
    props: {
      products: productsData.items,
      // article: articles?.items[0]?.fields?.untitled?.content[0] || '',
    },
  };
};

const Products = ({ products }) => {
  const [lang, setLang] = useState('en-US');
  const [article, setArticle] = useState<Document>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchData() {
      const articles = await getArticles(contentful.client, lang);
      setArticle(articles?.items[0]?.fields?.untitled?.content[0] || '');
    }
    fetchData();
  }, [lang]);
  const RICHTEXT_OPTIONS = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <div className='flex justify-center mt-4'>{children}</div>;
      },
    },
  };

  return (
    <div className='mx-36 my-10'>
      <h1 className='text-center text-5xl font-bold'>Shoes</h1>
      <div className='flex flex-row justify-center gap-6 my-6'>
        <button
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={() => setLang('en-US')}
        >
          English
        </button>
        <button
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={() => setLang('am-ET')}
        >
          Amharic
        </button>
      </div>
      {/* @ts-ignore */}
      {documentToReactComponents(article, RICHTEXT_OPTIONS)}
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
