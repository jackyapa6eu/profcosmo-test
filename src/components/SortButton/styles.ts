import styled from 'styled-components';
import { Button } from 'antd';

type ButtonSortOrder = 'asc' | 'desc';

interface SortImgProps {
  $sortorder?: ButtonSortOrder;
}

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

const SortImg = styled.img<SortImgProps>`
  transform: ${(p) => (p.$sortorder === 'asc' ? 'rotateX(180deg)' : 'rotateX(0deg)')};
  width: 20px;
  transition: transform ease 0.3s;
`;

export { StyledButton, SortImg };
