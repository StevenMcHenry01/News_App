import App, { Container } from 'next/app'
import Page from '../components/Page/Page'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

class MyApp extends App {
  // runs before first render
  // required for SSR (confusing but necessary)
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    // this allows for the page to finish any querys or mutations before rendering
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // exposes query to user
    pageProps.query = ctx.query
    return { pageProps }
  }
  render() {
    const { Component, apollo, pageProps } = this.props

    return (
      <Container>
        {/* allows access to local state within entire app */}
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
