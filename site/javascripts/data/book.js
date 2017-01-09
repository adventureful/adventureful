import contentful from 'contentful';

export function getBook() {
  return new Promise((resolve) => resolve({ fields: { startingPage: { sys: { id: '123' } } } }));
}
