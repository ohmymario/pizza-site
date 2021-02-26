import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

const BeersPage = (props) => {
  const {
    data: { beers },
  } = props;

  return (
    <>
      <SEO title={`Beers! We have ${beers.nodes.length} in stock`} />
      <h2 className="center">
        We have {beers.nodes.length} Beers Available. Dine in Only!
      </h2>
      <BeerGridStyles>
        {beers.nodes.map((beer) => {
          const { id, image, name, price, rating } = beer;

          if (!rating) return;
          const roundRating = Math.round(rating.average);

          const handleGenericImage = (e) => {
            e.target.src =
              'https://www.totalwine.com/media/sys_master/cmsmedia/hff/h0e/8979036078110.png';
          };

          return (
            <SingleBeerStyles key={id}>
              <img
                src={image}
                onError={(e) => handleGenericImage(e)}
                alt={name}
              />
              <h3>{name}</h3>
              {price}
              <p title={`${roundRating} out of 5 stars`}>
                {`⭐`.repeat(roundRating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - roundRating)}
                </span>
                <span>({rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
};

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        name
        id
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;

export default BeersPage;
