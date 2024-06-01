import { Form } from 'antd';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 6px rgba(213, 213, 213, 0.75);
  padding: 12px;
  border-radius: 6px;
  width: 100%;
  max-width: 360px;
  align-items: end;
`;

const StyledFormItem = styled(Form.Item)`
  width: 100%;

  & .ant-form-item-label {
    padding: 0;
  }

  & .ant-form-item-control-input {
    min-height: 24px;
  }
`;

export { StyledForm, StyledFormItem };
