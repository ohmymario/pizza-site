import styled from 'styled-components';

const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  --columns: 2;
  grid-template-columns: repeat(var(--columns), minmax(auto, 1fr));

  @media (max-width: 800px) {
    --columns: 1;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
`;

// Single Grid Item (for home page)
const ItemStyles = styled.div`
  position: relative;
  text-align: center;
  img {
    // auto - keep image aspect ratio
    height: auto;
    font-size: 0;
  }

  // Above Image Text
  p {
    position: absolute;
    top: 0;
    transform: rotate(-2deg) translateY(-10px);
    width: 100%;
    left: 0;
    margin: 0;
    font-size: 2rem;
    font-size: clamp(12px, 5vw, 20px);
  }
  .mark {
    display: inline;
  }

  // SHINE ANIMATION
  @keyframes shine {
    0% {
      background-position: 200%;
    }
    to {
      background-position: -80px;
    }
  }
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    background-size: 500px;
    animation: shine 1s infinite linear;
  }
`;

export { HomePageGrid, ItemsGrid, ItemStyles };
