import { type SchemaTypeDefinition } from 'sanity'

export const product: SchemaTypeDefinition = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}

export const userInteraction: SchemaTypeDefinition = {
  name: 'userInteraction',
  title: 'User Interaction',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'productId',
      title: 'Product ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'action',
      title: 'Action',
      type: 'string',
      options: {
        list: [
          { title: 'View', value: 'view' },
          { title: 'Add to Cart', value: 'add_to_cart' },
          { title: 'Purchase', value: 'purchase' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
}

export const category: SchemaTypeDefinition = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}

export const user: SchemaTypeDefinition = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Admin', value: 'admin' },
          { title: 'User', value: 'user' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
}

export const schemaTypes = [product, userInteraction, category, user]
