import React, { Component } from 'react'
import Downshift from 'downshift'
import Router from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import { DropDown, DropDownItem, SearchStyles } from '../Global_Styles/DropDown'

const SEARCH_ARTICLES_LEFT_QUERY = gql`
  query SEARCH_ARTICLES_LEFT_QUERY($term: String!, $page: Int!) {
    getLeftArticles(term: $term, page: $page) {
      title
    }
  }
`

class SearchBar extends Component {
  state = {
    articles: [],
    loading: false,
  }
  onChange = async (e, client) => {
    // query apollo when search bar is changed
    const res = await client.query({
      query: SEARCH_ARTICLES_LEFT_QUERY,
      variables: { term: e.target.value, page: 1 },
    })
    console.log(res)
  }
  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {client => (
              <input
                type="search"
                onChange={e => {
                  e.persist()
                  this.onChange(e, client)
                }}
              />
            )}
          </ApolloConsumer>
        </div>
      </SearchStyles>
    )
  }
}

export default SearchBar
