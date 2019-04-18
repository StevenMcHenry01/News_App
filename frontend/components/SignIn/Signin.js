import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'
import Router from 'next/router'

import StyledForm from '../Global_Styles/Form'
import styled from 'styled-components'
import Error from '../ErrorMesage/ErrorMessage'
import { CURRENT_USER_QUERY } from '../User/User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
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

const Forgot = styled.div`
  padding-top: 10px;
  font-style: italic;
`

export default class Signin extends Component {
  state = {
    name: '',
    password: '',
    email: '',
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <SignIn>
              <StyledForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault()
                  const res = await signin()
                  this.setState({ name: '', email: '', password: '' })
                  if (!error) Router.push('/')
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Sign In!</h2>
                  <Error error={error} />
                  <label htmlFor="email">
                    email
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.saveToState}
                    />
                    {error && error.message.includes('unique') ? (
                      <p>Oops, that email is already in use!</p>
                    ) : null}
                  </label>
                  <label htmlFor="password">
                    password
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.saveToState}
                    />
                  </label>
                  <button type="submit">Sign In</button>
                  <Forgot>
                    <Link href="/requestreset">
                      <a>Forgot your password?</a>
                    </Link>
                  </Forgot>
                </fieldset>
              </StyledForm>
            </SignIn>
          )
        }}
      </Mutation>
    )
  }
}
