import { client } from './sanity';
import imageUrlBuilder from '@sanity/image-url';

// Create an image URL builder using the client
const builder = imageUrlBuilder(client);

// Define a type for the image source
export type ImageAsset = {
    _type: 'reference'; // Assuming the type is a reference
    _ref: string; // This is usually the reference to the asset in Sanity
};

export type ImageSource = {
    _type: 'image'; // The type of the image
    asset: ImageAsset; // The asset reference
};

// Function to get the image URL from the source
export function urlFor(source: ImageSource | undefined) {
    if (!source || !source.asset || !source.asset._ref) {
        return '/placeholder-image.png'; // Return a string directly for fallback
    }
    return builder.image(source).url(); // Return the URL string directly
}
