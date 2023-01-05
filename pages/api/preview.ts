import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, productId } = req.query;
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !productId) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  res.setPreviewData({});
  res.redirect(`/products/${productId}`);
}
