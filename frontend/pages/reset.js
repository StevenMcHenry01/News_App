import Link from 'next/link'
import Reset from '../components/Reset/Reset'

import React, { Component } from 'react'

const reset = props => <Reset resetToken={props.query.resetToken} />

export default reset
