import React, { Component } from 'react'
import styled from 'styled-components'
import Signin from '../components/SignIn/Signin'
import RequestReset from '../components/RequestReset/RequestReset'

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`

export default class signin extends Component {
  render() {
    return (
      <Columns>
        <RequestReset />
      </Columns>
    )
  }
}
