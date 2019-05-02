import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { DropDown, DropDownItem, SearchStyles } from '../Global_Styles/DropDown'

class SearchBar extends Component {
  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {client => (
              <input
                type="search"
                onKeyDown={e => {
                  e.persist()
                  this.props.onChange(e, client)
                }}
              />
            )}
          </ApolloConsumer>
        </div>
      </SearchStyles>
    )
  }
}

export default SearchBar
