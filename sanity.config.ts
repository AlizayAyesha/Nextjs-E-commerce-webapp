'use client'

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { apiVersion, dataset, projectId } from './sanity/env';
import schemaTypes from './sanity/schemaTypes';
import { structure } from './sanity/structure'; // Your custom structure

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schemaTypes,
  plugins: [
    structure,
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
