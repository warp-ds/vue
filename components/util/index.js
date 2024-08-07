import { v4 as uuid } from '@lukeed/uuid';

export const id = { default: () => 'w-' + uuid() };
export const absentProp = Symbol();
export const installer = (components) => (app) =>
  components.forEach((c) => {
    if (!c.name) throw `Missing name property for ${c}`;
    if (app.component(c.name)) return; // we already registered the component - e.g. wClickable
    app.component(c.name, c);
  });
