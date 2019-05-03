import React, { Component } from 'react'
import styled from 'styled-components'
import { ApolloConsumer } from 'react-apollo'

const ArticleStyles = styled.div`
  padding: 3px;
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: 150px 100px;
  .box {
    background: white;
  }
  .a {
    grid-column: 1 / 3;
    grid-row: 1;
    padding: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    img {
      width: 283px;
      max-height: 130px;
    }
  }
  .b {
    grid-column: 1;
    grid-row: 2;
    font-size: 2.3rem;
    max-width: 150px;
    word-wrap: true;
    text-align: center;
    padding: 5px;
    justify-content: center;
    border-bottom-left-radius: 5px;
  }
  .c {
    grid-column: 2;
    grid-row: 2;
    font-size: 1rem;
    text-align: center;
    padding-right: 10px;
    justify-content: center;
    border-bottom-right-radius: 5px;
  }
`

class Articles extends Component {
  render() {
    return (
      <div>
        {this.props.ArticleArray.map(article => {
          if (article.title.length > 60) {
            article.title = article.title.slice(0, 60)
            article.title = article.title + '...'
          }
          if (article.source === 'Washingtonexaminer.com') {
            let art1 = article.source.slice(0, 10)
            let art2 = article.source.slice(10, 18)
            article.source = `${art1} ${art2}`
          }
          let url = article.url
          let image = article.urlToImage
          return (
            <ArticleStyles>
              <ApolloConsumer>
                {client => (
                  <>
                    <a
                      className="box a"
                      href={url}
                      target="_blank"
                      onClick={e => {
                        this.props.onClick(e, client)
                        this.props.checkAff(e, client)
                      }}
                    >
                      <img src={image} />
                    </a>
                    <div className="box b">{article.source}</div>
                    <div className="box c">{article.title}</div>
                  </>
                )}
              </ApolloConsumer>
            </ArticleStyles>
          )
        })}
      </div>
    )
  }
}

export default Articles
