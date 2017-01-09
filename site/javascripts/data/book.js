import client from './client'

export function getBook() {
  // return new Promise((resolve) => resolve({ fields: { startingPage: { sys: { id: '123' } } } }));
  return client().getEntries({content_type: 'book'})
    .then((books) => {
      if (books.items && books.items.length) {
        return books.items[0]
      } else {
        throw Error('Could not load a book!')
      }
    });
}
