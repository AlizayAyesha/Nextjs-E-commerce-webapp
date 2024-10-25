import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from '../env'; // Adjust the path based on your structure

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Adjust based on your data fetching needs
});
