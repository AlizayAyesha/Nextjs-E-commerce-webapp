import type {StructureResolver} from 'sanity/desk'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('user').title('Users'),
      S.documentTypeListItem('userInteraction').title('User Interactions'),
      // Add more document types here as needed
    ])
