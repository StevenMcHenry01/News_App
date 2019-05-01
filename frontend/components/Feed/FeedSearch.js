import React, { Component } from 'react'
import Downshift from 'downshift'
import Router from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import { DropDown, DropDownItem, SearchStyles } from '../Global_Styles/DropDown'

const SEARCH_ARTICLES_QUERY = gql`
  query SEARCH_ARTICLES_QUERY($term: String!) {
    getArticles($term)
  }
`

class SearchBar extends Component {
  render() {
    return (
      <SearchStyles>
        <div>
          <input type="search" />
        </div>
      </SearchStyles>
    )
  }
}

export default SearchBar
