import styled from 'styled-components'

const FeedStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  max-width: ${props => props.theme.maxWidth};
  background: ${props => props.theme.lightGrey};
`

const ColumnStyles1 = styled.div`
  padding: 5px;
  border-right: 4px solid white;
`

const ColumnStyles2 = styled.div`
  padding: 5px;
  padding-left: 7px;
`

const ColumnStyles3 = styled.div`
  border-left: 4px solid white;
  padding: 5px;
`
export { FeedStyles, ColumnStyles1, ColumnStyles2, ColumnStyles3 }
