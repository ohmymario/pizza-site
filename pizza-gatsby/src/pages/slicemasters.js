import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const SlicemastersPage = ({ data, pageContext }) => {
  const slicemasters = data.slicemasters.nodes;
  const { totalCount } = data.slicemasters;
  const { currentPage, skip } = pageContext;
  const pageSize = process.env.GATSBY_PAGE_SIZE;

  return (
    <>
      <SEO title={`slicemasters - Page ${pageContext.currentPage || 1} `} />
      <Pagination
        pageSize={parseInt(pageSize)}
        currentPage={currentPage || 1}
        skip={skip}
        base="/slicemasters"
        totalCount={totalCount}
      />
      <SlicemasterGrid>
        {slicemasters.map((person) => {
          const { id, slug, name, image, description } = person;
          return (
            <SlicemasterStyles key={id}>
              <Link to={`/slicemaster/${slug.current}`}>
                <h2>
                  <span className="mark">{name}</span>
                </h2>
              </Link>
              <Img fluid={image.asset.fluid} />
              <p className="description">{description}</p>
            </SlicemasterStyles>
          );
        })}
      </SlicemasterGrid>
    </>
  );
};

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default SlicemastersPage;
