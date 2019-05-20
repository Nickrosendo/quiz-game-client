import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'
import Button from '../../components/Button/Button'
import { Loader } from '../../components/Loader/Loader'
import { joinClasses } from '../../utils/classUtils'

const Style = {
  view:     'login',
  box:      'login__box',
  form:     'login__form',
  user:     'login__user',
  input:    'login__input',
  icon:     'login__icon',
  field:    'login__field',
  label:    'login__label',
  buttons:  'login__buttons',
  button:   'login__button',
  error:    'login__error',
  google:   'fab fa-google',
  facebook: 'fab fa-facebook-f',
}

class Login extends PureComponent {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error:    false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleGuestSignIn = this.handleGuestSignIn.bind(this)
    this.renderError = this.renderError.bind(this)
  }

  handleChange({ target }) {
    this.setState({ [ target.name ]: target.value })
  }

  renderError() {
    const { username, password, error } = this.state
    if ((!username || !password) && error) {
      return (
        <div className={ Style.error }>Usuário inválido</div>
      )
    }
  }

  handleGuestSignIn(e) {
    e.preventDefault()
    this.props.onLogIn("user", "user")
  }

  handleSignIn(e) {
    e.preventDefault()
    const { username, password } = this.state
    if (!username || !password) {
      return this.setState({ error: true })
    }
    this.props.onLogIn(username, password)
  }

  handleSignUp(e) {
    e.preventDefault()
    const { username, password } = this.state
    if (!username || !password) {
      return this.setState({ error: true })
    }
    this.props.onSignUp(username, password)
  }

  render() {
    const { error, username, password } = this.state
    const { loading } = this.props

    return (
      <div className={ Style.view }>
        <div className={ Style.box }>
          <div className={ Style.user }>
            <i className="fas fa-user"></i>
          </div>
          <form
            className={ Style.form }
            onSubmit={ this.handleSignIn }
          >
            <label className={ Style.label } htmlFor="username">Usuário</label>
            <div className={ Style.input }>
              <i className={ joinClasses(Style.icon, 'far fa-user') }></i>
              <input
                id='username'
                name='username'
                type='text'
                value={ username }
                className={ Style.field }
                onChange={ this.handleChange }
              />
            </div>
            <label className={ Style.label } htmlFor="password">Senha</label>
            <div className={ Style.input }>
              <i className={ joinClasses(Style.icon, 'fas fa-lock') }></i>
              <input
                id='password'
                name='password'
                type='password'
                value={ password }
                className={ Style.field }
                onChange={ this.handleChange }
              />
            </div>
            { this.renderError(error) }
            <div className={ Style.buttons }>
              <Button
                className={ Style.button }
                text='Entrar'
                type='submit'
                disabled={ loading }
              />
              <Button
                className={ Style.button }
                onClick={ this.handleSignUp }
                text='Cadastrar'
                type='button'
                disabled={ loading }
              />
            </div>
            <div className={ Style.buttons }>
              <Button
                className={ Style.button }
                onClick={ this.handleGuestSignIn }
                text='Entrar como visitante'
                type='button'
                disabled={ loading }
              />
            </div>
          </form>
          <Loader loading={ loading } />
        </div>
      </div>
    )
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login)

Login.propTypes = {
  /** */
  loading:         PropTypes.bool,
  /** */
  onLogIn:         PropTypes.func,
  /** */
  onSignUp:        PropTypes.func,
  /** */
  onGoogleLogIn:   PropTypes.func,
  /** */
  onFacebookLogIn: PropTypes.func,
  /** */
  throwError:      PropTypes.func,
}
