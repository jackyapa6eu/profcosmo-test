import styled from 'styled-components';

const MainPageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 635px);
  align-items: start;
  justify-content: center;
  grid-template-areas:
    'createForm filters'
    'tasksList tasksList';

  @media screen and (max-width: 1320px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'createForm'
      'filters'
      'tasksList';
  }
`;

export { MainPageContainer };
