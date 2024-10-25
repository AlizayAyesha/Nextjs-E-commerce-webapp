import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
// Removed ImageSource import

// Create a Sanity client
export const client = createClient({
    projectId: '7p0muvi9',
    dataset: 'production',
    apiVersion: '2022-03-25',
    useCdn: true,
});

// Create an image URL builder using the client
const builder = imageUrlBuilder(client);

// Function to get the image URL from the source
export function urlFor(source: any) { // Use 'any' temporarily
    return builder.image(source); // Return the image URL using the builder
}
