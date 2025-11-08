const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '7p0muvi9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
  // token not needed for read operations
});

async function createCategories() {
  try {
    // Check if categories already exist
    const existingCategories = await client.fetch('*[_type == "category"]');
    console.log('Existing categories:', existingCategories.length);

    if (existingCategories.length > 0) {
      console.log('Categories already exist:', existingCategories.map(c => c.name));
      return;
    }

    // Create default categories
    const categories = [
      { _type: 'category', name: 'Men', slug: { _type: 'slug', current: 'men' }, description: 'Men\'s fashion and accessories' },
      { _type: 'category', name: 'Women', slug: { _type: 'slug', current: 'women' }, description: 'Women\'s fashion and accessories' },
      { _type: 'category', name: 'Kids', slug: { _type: 'slug', current: 'kids' }, description: 'Children\'s fashion and accessories' },
      { _type: 'category', name: 'Luxury', slug: { _type: 'slug', current: 'luxury' }, description: 'Luxury items and premium products' },
      { _type: 'category', name: 'Top picks', slug: { _type: 'slug', current: 'top-picks' }, description: 'Featured and top-rated products' }
    ];

    for (const category of categories) {
      const result = await client.create(category);
      console.log('Created category:', result.name);
    }

    console.log('All categories created successfully!');
  } catch (error) {
    console.error('Error creating categories:', error);
  }
}

createCategories();
