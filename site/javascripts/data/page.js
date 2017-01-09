import contentful from 'contentful';

export function getPage(id) {
  return new Promise((resolve) => resolve({
    sys: { id: id },
    fields: {
      title: 'Hello',
      body: '## This is a story about test data',
      nextPage: [
        { sys: { id: id + 1 }, fields: {title: 'Do smth'} }
      ]
    }
  }));
}
