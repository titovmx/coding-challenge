import React from 'react';
import styled from 'styled-components';

type Props = React.PropsWithChildren<{
  label: string;
  onSelectedChange: (option: string) => void;
}>;

export default function InlineSelect({ children, label, onSelectedChange }: Props) {
  const size = React.Children.count(children);

  return (
    <>
      {label && <h3 style={{ fontWeight: 'bold' }}>{label}</h3>}
      <Container>
        {React.Children.map(
          children,
          (child, i) =>
            child &&
            React.cloneElement(child as React.ReactElement, {
              isFirst: i === 0,
              isLast: i === size - 1,
              onClick: (option: string) => onSelectedChange(option),
            }),
        )}
      </Container>
    </>
  );
}

type OptionProps = {
  value: string;
  isSelected?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onClick?: (option: string) => void;
};

export function Option({ value, onClick, ...props }: OptionProps) {
  return (
    <OptionComponent {...props} onClick={() => onClick && onClick(value)}>
      {value}
    </OptionComponent>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const OptionComponent = styled.button.attrs((props: OptionProps) => ({
  isFirst: props.isFirst || false,
  isLast: props.isLast || false,
  isSelected: props.isSelected || false,
}))`
  border-width: 1px;
  border-left-width: ${(props) => (props.isFirst ? '1px' : '0')};
  border-radius: ${(props) => {
    if (props.isFirst) {
      return '8px 0 0 8px';
    }

    if (props.isLast) {
      return '0 8px 8px 0';
    }

    return '0';
  }};
  border-style: solid;
  background-color: ${(props) => (props.isSelected ? '#BFDBFE' : '#fff')};
`;
