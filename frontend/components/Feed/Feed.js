import React, { Component } from 'react'

import FeedStyles from './FeedSyles'
import User from '../User/User'
import StyledForm from '../Global_Styles/Form'
import FeedSearch from './FeedSearch'

export default class Feed extends Component {
  state = {
    search: '',
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
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
                  <FeedSearch />
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
