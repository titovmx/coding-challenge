import styled from 'styled-components'

type Props = {
  size: number;
}

export const Icon = styled.img.attrs(({size}: Props) => ({
  size
}))`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`