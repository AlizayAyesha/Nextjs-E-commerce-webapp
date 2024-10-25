import { StructureBuilder } from 'sanity/desk'; 

// Define the structure for Sanity Studio
export const structure: (S: StructureBuilder) => ReturnType<typeof S.list> = (S) => 
  S.list()
    .title('Content')
    .items(S.documentTypeListItems());
