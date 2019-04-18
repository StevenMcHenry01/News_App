import React, { Component } from 'react'
import styled from 'styled-components'
import Signup from '../components/SignUp/Signup'
import Signin from '../components/SignIn/Signin'
import RequestReset from '../components/RequestReset/RequestReset'

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`

export default class signup extends Component {
  render() {
    return (
      <Columns>
        <Signup />
      </Columns>
    )
  }
}
