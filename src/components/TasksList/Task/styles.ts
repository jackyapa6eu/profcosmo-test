import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';
import { Checkbox } from 'antd';

type ButtonSortOrder = string;
type Justify = string;
type Align = string;

interface ITaskItem {
  $gridarea?: ButtonSortOrder;
  $justify?: Justify;
  $align?: Align;
}

const TaskContainer = styled.div`
  display: grid;
  position: relative;
  box-shadow: 0 0 6px rgba(213, 213, 213, 0.75);
  padding: 6px;
  border-radius: 6px;
  gap: 3px;
  grid-template-columns: 1fr 130px;
  grid-template-rows: 24px minmax(24px, 1fr) 24px;
  grid-template-areas:
    'name status'
    'text .'
    'author button';

  @media screen and (max-width: 700px) {
    grid-template-areas:
      'name status'
      'text text'
      'author button';
  }
  @media screen and (max-width: 470px) {
    grid-template-rows: 48px minmax(24px, 1fr) 24px;
  }
`;

const TaskItem = styled.div<ITaskItem>`
  display: flex;
  justify-content: ${({ $justify }) => $justify ?? 'start'};
  align-items: ${({ $align }) => $align ?? 'center'};
  grid-area: ${({ $gridarea }) => $gridarea ?? ' '};
`;

const StyledText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 16px;
  min-height: 32px;
  font-family: Roboto, sans-serif;
  padding-bottom: 1px;
`;

const StyledTextArea = styled(TextArea)`
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 16px !important;
  font-family: Roboto, sans-serif;
  resize: none;
  overflow: auto;
  border: none;
  background: #f5f5f5;
`;

const StyledCheckbox = styled(Checkbox)`
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 16px !important;
  font-family: Roboto, sans-serif;

  & span {
    padding-right: 0;
  }
`;

export { TaskContainer, TaskItem, StyledText, StyledTextArea, StyledCheckbox };
