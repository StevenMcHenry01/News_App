import Link from 'next/link'
import Nav from '../Nav/Nav'
import styled from 'styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'

// loading bar at top of page. Hooking into route changes instead of clicking links
Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

// styles
const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  a {
    padding: 0.5rem 1rem;
    background: teal;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`

const SyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
`

// Component
const Header = () => (
  <SyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>News</a>
        </Link>
      </Logo>
      <Nav />
    </div>
  </SyledHeader>
)

export default Header
