import { Children, cloneElement } from 'react'
import styled from 'styled-components'

type Props = React.PropsWithChildren<{
  label: string;
  onSelectedChange: (option: string) => void;
}>;

export default function InlineSelect({ children, label, onSelectedChange }: Props) {
  return (
    <>
      {label && <h3 style={{ fontWeight: 'bold' }}>{label}</h3>}
      <Container>
        {Children.map(
          children,
          child =>
            child &&
            cloneElement(child as React.ReactElement, {
              onClick: (option: string) => onSelectedChange(option),
            }),
        )}
      </Container>
    </>
  )
}

type OptionProps = {
  value: string;
  isSelected?: boolean;
  onClick?: (option: string) => void;
};

export function Option({ value, onClick, ...props }: OptionProps) {
  return (
    <OptionComponent {...props} onClick={() => onClick && onClick(value)}>
      {value}
    </OptionComponent>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const OptionComponent = styled.button.attrs(({isSelected = false}: OptionProps) => ({
  isSelected,
}))`
  border-width: 1px;
  border-left-width: 0;
  border-radius: 0;
  border-style: solid;
  background-color: ${(props) => (props.isSelected ? '#BFDBFE' : '#fff')};
  padding: 4px 8px;
  text-transform: capitalize; 

  &:first-child {
    border-radius: 8px 0 0 8px;
    border-left-width: 1px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
  }
`
