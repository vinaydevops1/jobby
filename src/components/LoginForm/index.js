import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    isError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        errMsg: data.error_msg,
        isError: true,
      })
    }
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderNameInput = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label className="label-style" htmlFor="name">
          USERNAME
        </label>
        <input
          type="text"
          id="name"
          value={username}
          onChange={this.onChangeName}
          className="input-style"
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="label-style" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          className="input-style"
        />
      </div>
    )
  }

  render() {
    const {isError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    console.log(errMsg)
    return (
      <div className="bg-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-size"
          />
          {this.renderNameInput()}
          {this.renderPasswordInput()}
          <button type="submit" className="button">
            Login
          </button>
          {isError ? <p className="error-para">*{errMsg}</p> : null}
        </form>
      </div>
    )
  }
}

export default LoginForm
