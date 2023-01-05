import type { NextApiRequest, NextApiResponse } from 'next';
import { getProduct } from '../../utils/products';
import * as contentful from '../../utils/contentful';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, productId } = req.query;
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !productId) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  // @ts-ignore
  const product = await getProduct(contentful.client, productId);
  if (!product.items.length) {
    return res.status(401).json({ message: 'Invalid productId' });
  }
  const verifiedProductId = product.items[0].fields?.productId || '';

  res.setPreviewData({});
  res.redirect(`/products/${verifiedProductId}`);
}
