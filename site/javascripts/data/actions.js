export function getActions() {
  return new Promise((resolve) => resolve(actions));
}
export function getAction(id) {
  return new Promise((resolve, reject) => {
    const item = actions.find((action) => action.id === id);
    if (item) {
      resolve(item)
    } else {
      reject(item)
    }
  });
}
const actions = [
  {
    page: { sys: { id: 'WQ9nyQIZG0ccq0u00A2G8' }, fields: { title: 'The beginning'} },
    text: 'Inspect the clock',
    id: '1'
  },
  {
    page: { sys: { id: '4IzD1LLPAA4qYQWuuy0Cgo' }, fields: { title: 'Look out the window'} },
    text: 'Give the snowman an evil stare',
    id: '2'
  }
];
