// schemaTypes.ts

import { defineType } from "sanity";

const schemaTypes = [
  // Define your schema types here
  defineType({
    name: 'example',
    title: 'Example',
    type: 'document',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'text' },
    ],
  }),
  // Add other types as needed
];
export default schemaTypes;