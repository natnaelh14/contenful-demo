export async function getProduct(client: Object, productId: string) {
  // @ts-ignore
  return client.getEntries({
    content_type: 'productReview',
    limit: 1,
    'fields.productId': productId,
  });
}

export async function getProducts(client: Object) {
  // @ts-ignore
  return client.getEntries({
    content_type: 'productReview',
  });
}
