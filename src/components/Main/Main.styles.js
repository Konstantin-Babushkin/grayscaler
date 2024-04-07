import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Input = styled.input`
  width: 270px;
  height: 30px !important;
  appearance: auto !important;
  overflow: auto !important;
`

export const Title = styled.h2`
  font-size: 36px;
  margin: 16px 0;
`

export const Description = styled.p``

export const Link = styled.a`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.primary};
  font-weight: bold;
  margin: 0 5px;
  display: inline;
`
