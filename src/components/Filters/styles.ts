import styled from 'styled-components';
import { Form } from 'antd';

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  justify-items: start;
  gap: 6px;
  padding: 12px;
  box-shadow: 0 0 6px rgba(213, 213, 213, 0.75);
  grid-area: filters;
`;

const SelectsContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  & .ant-form-item-label {
    padding: 0;
  }

  & .ant-form-item-control-input {
    min-height: 24px;
  }
`;

const FormTitle = styled.h3`
  margin: 0;
`;

export { FiltersContainer, SelectsContainer, FormTitle };
