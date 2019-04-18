import React, { Component } from 'react'

import FeedStyles from './FeedSyles'
import User from '../User/User'
import StyledForm from '../Global_Styles/Form'

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
                  <StyledForm
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault()
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Search</h2>
                      <label htmlFor="search">
                        <input
                          name="search"
                          type="text"
                          placeholder="Event"
                          value={this.state.search}
                          onChange={this.saveToState}
                        />
                      </label>
                      <button type="submit">Search</button>
                    </fieldset>
                  </StyledForm>
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
