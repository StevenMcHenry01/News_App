import React, { Component } from 'react'

import { FeedStyles, ColumnStyles } from './FeedSyles'
import User from '../User/User'
import FeedSearch from './FeedSearch'
import gql from 'graphql-tag'
import Columns from 'react-columns'
import ArticlesComponent from './Articles'
import uuid from 'uuid/v4'

const SEARCH_ARTICLES_LEFT_QUERY = gql`
  query SEARCH_ARTICLES_LEFT_QUERY($term: String!, $page: Int!) {
    getLeftArticles(term: $term, page: $page) {
      source
      title
      url
      urlToImage
      description
    }
  }
`
const SEARCH_ARTICLES_RIGHT_QUERY = gql`
  query SEARCH_ARTICLES_RIGHT_QUERY($term: String!, $page: Int!) {
    getRightArticles(term: $term, page: $page) {
      source
      title
      url
      urlToImage
      description
    }
  }
`
const SEARCH_ARTICLES_CENTER_QUERY = gql`
  query SEARCH_ARTICLES_CENTER_QUERY($term: String!, $page: Int!) {
    getCenterArticles(term: $term, page: $page) {
      source
      title
      url
      urlToImage
      description
    }
  }
`

export default class Feed extends Component {
  state = {
    leftArticles: [],
    rightArticles: [],
    centerArticles: [],
    loading: false,
    page: 1,
    searchTerm: '',
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onChange = async (e, client) => {
    if (e.key === 'Enter') {
      // turn loading on
      this.setState({ loading: true })
      this.setState({ searchTerm: e.target.value })
      // query apollo when search bar is change
      const resLeft = await client.query({
        query: SEARCH_ARTICLES_LEFT_QUERY,
        variables: { term: e.target.value, page: this.state.page },
      })
      const resRight = await client.query({
        query: SEARCH_ARTICLES_RIGHT_QUERY,
        variables: { term: e.target.value, page: this.state.page },
      })
      const resCenter = await client.query({
        query: SEARCH_ARTICLES_CENTER_QUERY,
        variables: { term: e.target.value, page: this.state.page },
      })
      this.setState({
        leftArticles: resLeft.data.getLeftArticles,
        rightArticles: resRight.data.getRightArticles,
        centerArticles: resCenter.data.getCenterArticles,
        loading: false,
      })
    }
  }
  render() {
    return (
      <User>
        {payload => {
          let { me } = payload.data
          let { error, loading } = payload
          return (
            <FeedStyles>
              {me && (
                <>
                  <FeedSearch onChange={this.onChange} />
                  {this.state.loading && <p>loading</p>}
                  {this.state.leftArticles[0] && this.state.searchTerm && (
                    <Columns columns={3}>
                      <ColumnStyles>
                        <h3>LEFT</h3>
                        <ArticlesComponent ArticleArray={this.state.leftArticles} key={uuid()} />
                      </ColumnStyles>
                      <ColumnStyles>
                        <h3>CENTER</h3>
                        <ArticlesComponent ArticleArray={this.state.centerArticles} key={uuid()} />
                      </ColumnStyles>
                      <ColumnStyles>
                        <h3>RIGHT</h3>
                        <ArticlesComponent ArticleArray={this.state.rightArticles} key={uuid()} />
                      </ColumnStyles>
                    </Columns>
                  )}
                </>
              )}
              {!me && <p>loading...</p>}
            </FeedStyles>
          )
        }}
      </User>
    )
  }
}
