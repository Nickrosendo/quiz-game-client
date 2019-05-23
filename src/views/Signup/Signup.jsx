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

class Signup extends PureComponent {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      name: '',
      c_password: '',
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
    const { email, password, name, c_password, error } = this.state
    if ((!email || !password || !name || !c_password) && error) {
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
    const { email, password } = this.state
    if (!email || !password) {
      return this.setState({ error: true })
    }
    this.props.onLogIn(email, password)
  }

  handleSignUp(e) {
    e.preventDefault()
    const { email, password, name, c_password } = this.state
    if ((!email || !password || !name || !c_password) && error) {
      return this.setState({ error: true })
    }
    this.props.onSignUp(email, password, name, c_password)
  }

  render() {
    const { error, email, password, name } = this.state
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
            <label className={ Style.label } htmlFor="name">Nome(opcional)</label>
            <div className={ Style.input }>
              <i className={ joinClasses(Style.icon, 'fas fa-lock') }></i>
              <input
                id='name'
                name='name'
                type='name'
                value={ name }
                className={ Style.field }
                onChange={ this.handleChange }
              />
            </div>
            <label className={ Style.label } htmlFor="email">Email</label>
            <div className={ Style.input }>
              <i className={ joinClasses(Style.icon, 'far fa-user') }></i>
              <input
                id='email'
                name='email'
                type='text'
                value={ email }
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
            <label className={ Style.label } htmlFor="c_password">Confirmar Senha</label>
            <div className={ Style.input }>
              <i className={ joinClasses(Style.icon, 'fas fa-lock') }></i>
              <input
                id='c_password'
                name='c_password'
                type='c_password'
                value={ c_password }
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

export default connect(mapStoreToProps, mapDispatchToProps)(Signup)

Signup.propTypes = {
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
