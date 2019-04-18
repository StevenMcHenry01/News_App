import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import StyledForm from '../Global_Styles/Form'
import styled from 'styled-components'
import Error from '../ErrorMesage/ErrorMessage'
import { CURRENT_USER_QUERY } from '../User/User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`

const SignUp = styled.div`
  max-width: 500px;
  margin: 0 auto;
`

export default class Signup extends Component {
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
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          return (
            <SignUp>
              <StyledForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault()
                  const res = await signup()
                  this.setState({ name: '', email: '', password: '' })
                  if (!error) Router.push('/feed')
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Sign Up for an Account!</h2>
                  {/* <Error error={error} /> */}
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
                  <label htmlFor="name">
                    name
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      value={this.state.name}
                      onChange={this.saveToState}
                    />
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
                  <button type="submit">Submit</button>
                </fieldset>
              </StyledForm>
            </SignUp>
          )
        }}
      </Mutation>
    )
  }
}
