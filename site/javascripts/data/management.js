import contentful from 'contentful-management';
import config from './config'

function getSpace(cmaKey) {
  var client = contentful.createClient({
    accessToken: cmaKey
  });
  return client.getSpace(config.space_id);
}

function waitABit(fn) {
  const aBit = 7000
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn())
    }, aBit)
  })
}

export function makePage(cmaKey, pageDto) {
  return getSpace(cmaKey).then((space) =>
    space.createEntry('page', {
      fields: {
        title: {
          'en-US': pageDto.title
        },
        body: {
          'en-US': pageDto.body
        }
      }
    })).then(function(page) {
      console.log('created page', page)
      return page.publish()
    });
}
export function makeLink(cmaKey, linkDto) {
  return getSpace(cmaKey).then((space) =>
    space.createEntry('choice', {
      fields: {
        name: {
          'en-US': linkDto.name
        },
        link: {
          'en-US': {
            sys: {
              id: linkDto.pageId,
              linkType: "Entry",
              type: "Link"
            }
          }
        }
      }
    })).then(function(link) {
      console.log('created link', link)
      return waitABit(() => link.publish())
    });
}
export function addLinkToPage(cmaKey, pageId, linkId) {
  return getSpace(cmaKey)
    .then((space) => space.getEntry(pageId))
    .then((page) => {
      page.fields.nextPage['en-US'].push({
        sys: {
          id: linkId,
          linkType: "Entry",
          type: "Link"
        }
      });
      return page.update();
    }).then(function(page) {
      console.log('updated page', page)
      return waitABit(() => page.publish())
    });
}
