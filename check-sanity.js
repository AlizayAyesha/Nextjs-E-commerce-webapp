const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '7p0muvi9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

async function checkProducts() {
  try {
    const products = await client.fetch('*[_type == "product"] { name, category, _id }');
    console.log('Products in Sanity:');
    products.forEach(p => console.log(`${p.name}:`, p.category));

    // Check if category is reference, get the name
    const productsWithCategory = await client.fetch(`
      *[_type == "product"] {
        name,
        category,
        "categoryName": category->name
      }
    `);
    console.log('\nProducts with category names:');
    productsWithCategory.forEach(p => console.log(`${p.name}: ${p.categoryName}`));

    const categories = [...new Set(productsWithCategory.map(p => p.categoryName).filter(Boolean))];
    console.log('\nUnique category names:', categories);
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProducts();
