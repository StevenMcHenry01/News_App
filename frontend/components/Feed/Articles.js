import React, { Component } from 'react'

class Articles extends Component {
  render() {
    return (
      <div>
        {this.props.ArticleArray.map(article => {
          let url = article.url
          return (
            <>
              <p>{article.source}</p>
              <p>{article.title}</p>
              <a href={url} target="_blank">
                Link
              </a>
            </>
          )
        })}
      </div>
    )
  }
}

export default Articles
