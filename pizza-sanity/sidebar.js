import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// Custom Sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        // make a new doc id, remove old random numbers
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      // add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
