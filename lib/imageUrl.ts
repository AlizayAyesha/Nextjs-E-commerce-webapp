import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Create a Sanity client
export const client = createClient({
    projectId: '7p0muvi9',
    dataset: 'production',
    apiVersion: '2022-03-25',
    useCdn: true,
});

// Create an image URL builder using the client
const builder = imageUrlBuilder(client);

// Define a type for the image source
type ImageAsset = {
    _type: 'reference'; // Assuming the type is a reference
    _ref: string; // This is usually the reference to the asset in Sanity
};

type ImageSource = {
    _type: 'image'; // The type of the image
    asset: ImageAsset; // The asset reference
};

// Function to get the image URL from the source
export function urlFor(source: ImageSource) {
    return builder.image(source).url(); // Return the image URL
}
