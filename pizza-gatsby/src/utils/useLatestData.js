import { useState, useEffect } from 'react';

function useLatestData() {
  // Hot Slices
  const [hotSlices, setHotSlices] = useState();
  // Slicemasters
  const [slicemasters, setSlicemasters] = useState();

  const query = {
    query: `
      query {
        StoreSettings(id: "downtown") {
          name
          slicemaster {
            name
          }
          hotSlices {
            name
          }
        }
      }
    `,
  };

  // Effect to fetch the data from the graphql endpoint
  useEffect(() => {
    // effect;
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((res) => {
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      });
    return () => {
      // cleanup;
    };
    // Run Once
  }, []);

  return { hotSlices, slicemasters };
}

export default useLatestData;
