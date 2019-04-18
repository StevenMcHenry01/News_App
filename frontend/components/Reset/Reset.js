import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import StyledForm from '../Global_Styles/Form'
import styled from 'styled-components'
import Error from '../ErrorMesage/ErrorMessage'
import Emoji from '../Utils/Emoji'
import { CURRENT_USER_QUERY } from '../User/User'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`

const SignIn = styled.div`
  max-width: 500px;
  margin: 0 auto;
`

export default class Reset extends Component {
  state = {
    password: '',
    confirmPassword: '',
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => {
          return (
            <SignIn>
              <StyledForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault()
                  const res = await reset()
                  this.setState({ password: '', confirmPassword: '' })
                  if (!error) Router.push('/')
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Choose New Password</h2>
                  <Error error={error} />
                  <label htmlFor="password">
                    new password
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.saveToState}
                    />
                  </label>
                  <label htmlFor="confirmPassword">
                    confirm password
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="confirmPassword"
                      value={this.state.confirmPassword}
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
