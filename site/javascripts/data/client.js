import contentful from 'contentful';
import config from './config'

var client = null;

export default function createClient() {
  if (!client) {
    client = contentful.createClient({
      space: config.space_id,
      accessToken: config.cda_key
    });
  }
  return client;
}
