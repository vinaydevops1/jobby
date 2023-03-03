import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    console.log(props)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-bg-container">
      <ul className="home-job">
        <Link to="/" className="link-style">
          <li className="list-style">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo-size"
            />
          </li>
        </Link>
        <li className="list-style home-job">
          <Link to="/" className="link-style">
            <p className="list-style">Home</p>
          </Link>
          <Link to="/jobs" className="link-style">
            <p className="list-style">Jobs</p>
          </Link>
        </li>
        <li className="list-style">
          <button type="button" onClick={onClickLogout} className="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
