import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import StyledForm from '../Global_Styles/Form'
import styled from 'styled-components'
import Error from '../ErrorMesage/ErrorMessage'
import Emoji from '../Utils/Emoji'
import { CURRENT_USER_QUERY } from '../User/User'

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`

const SignIn = styled.div`
  max-width: 500px;
  margin: 0 auto;
`

export default class ResquestReset extends Component {
  state = {
    email: '',
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => {
          return (
            <SignIn>
              <StyledForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault()
                  const res = await reset()
                  this.setState({ email: '' })
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Reset Password</h2>
                  <Error error={error} />
                  {!error && !loading && called && (
                    <p>
                      Success! Check your email for a reset link <Emoji symbol="😃" />
                    </p>
                  )}
                  <label htmlFor="email">
                    email
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.saveToState}
                    />
                  </label>
                  <button type="submit">Reset</button>
                </fieldset>
              </StyledForm>
            </SignIn>
          )
        }}
      </Mutation>
    )
  }
}
