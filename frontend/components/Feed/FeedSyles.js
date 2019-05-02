import styled from 'styled-components'

const FeedStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  max-width: ${props => props.theme.maxWidth};
`

const ColumnStyles = styled.div`
  border: 1px solid black;
`
export { FeedStyles, ColumnStyles }
