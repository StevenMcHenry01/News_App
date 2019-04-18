import Link from 'next/link'
import NavStyles from './NavStyles'
import User from '../User/User'
import Signout from '../SignOut/Signout'

const Nav = () => (
  <User>
    {payload => {
      let { me } = payload.data
      return (
        <NavStyles>
          <Link href="/">
            <a>About</a>
          </Link>
          {me && (
            <>
              <Link href="/feed">
                <a>Feed</a>
              </Link>
              <Link href="/account">
                <a>Account</a>
              </Link>
              <Signout />
            </>
          )}
          {!me && (
            <>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </>
          )}
        </NavStyles>
      )
    }}
  </User>
)

export default Nav
