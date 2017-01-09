import contentful from 'contentful';

export function getBook() {
  return new Promise((resolve) => resolve({ fields: { startingPage: '123' } }));
}
