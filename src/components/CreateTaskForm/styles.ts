import styled from 'styled-components';
import { Form } from 'antd';

type FormItemGridAre = string;

interface IFormItemProps {
  gridarea?: FormItemGridAre;
}

const StyledForm = styled(Form)`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, min-content);
  gap: 12px;
  box-shadow: 0 0 6px rgba(213, 213, 213, 0.75);
  padding: 12px;
  border-radius: 6px;
  grid-area: createForm;
  grid-template-areas:
    'title title'
    'name author'
    'text text'
    '. submit';

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'name'
      'author'
      'text'
      'submit';
  }
`;

const FormTitle = styled.h3`
  margin: 0;
  grid-area: title;
`;

const StyledFormItem = styled(Form.Item)<IFormItemProps>`
  width: 100%;
  margin: 0;
  grid-area: ${(p) => p.gridarea ?? ' '};
  & .ant-form-item-label {
    padding: 0;
  }

  & .ant-form-item-control-input {
    min-height: 24px;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  grid-area: submit;
`;

export { StyledForm, StyledFormItem, SubmitButtonContainer, FormTitle };
