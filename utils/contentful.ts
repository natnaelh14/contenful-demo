import * as contentful from 'contentful';

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  environment: 'master', // defaults to 'master' if not set
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});
