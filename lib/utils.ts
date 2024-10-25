// lib/utils.ts
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Create a Sanity client
const client = createClient({
  projectId: '7p0muvi9', // Your Sanity project ID
  dataset: 'production', // Your dataset name
  apiVersion: '2024-10-09', // API version
  useCdn: true, // Use CDN for faster response times
});

// Create an image URL builder
const builder = imageUrlBuilder(client);

// Example type for the image source
export type ImageSource = { // Export the ImageSource type
  _type: 'image';
  asset: {
    _ref: string; // Reference to the asset
    _type: 'reference';
  };
};

// Function to generate image URLs
export function urlFor(source: ImageSource) { // Explicitly define the type
  return builder.image(source);
}

// Function to merge Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
