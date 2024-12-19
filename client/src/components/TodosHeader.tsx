import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  margin: 8px 0;
  color: #263238;
`;

const _status = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: fixed;
  top: 25px;
`;

const Online = styled(_status)`
  background-color: lime;
`;

const Offline = styled(_status)`
  background-color: crimson;
`;

export interface TodosHeaderProps {
  online?: boolean;
  className?: string;
}

const _TodosHeader: React.FC<React.PropsWithChildren<TodosHeaderProps>> = ({
  online,
  children,
  className,
}) => (
  <div data-cy='TodosHeader' className={className}>
    {online ? <Online /> : <Offline />}
    <Heading>TODO APP</Heading>
    {children}
  </div>
);

export const TodosHeader = styled(_TodosHeader)`
  padding: 8px;
`;
