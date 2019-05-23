import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStoreToProps, mapDispatchToProps } from "./storeHelper";
import Button from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";
import { joinClasses } from "../../utils/classUtils";

const Style = {
  view: "login",
  box: "login__box",
  form: "login__form",
  user: "login__user",
  input: "login__input",
  icon: "login__icon",
  field: "login__field",
  label: "login__label",
  buttons: "login__buttons",
  button: "login__button",
  error: "login__error",
  google: "fab fa-google",
  facebook: "fab fa-facebook-f"
};

class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      type: "login",
      email: "",
      password: "",
      name: "",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleGuestSignIn = this.handleGuestSignIn.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  renderError() {
    const { email, password, error } = this.state;
    if ((!email || !password) && error) {
      return <div className={Style.error}>Usuário inválido</div>;
    }
  }

  handleGuestSignIn(e) {
    e.preventDefault();
    this.props.onLogIn("user", "user");
  }

  handleSignIn(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({ error: true });
    }
    this.props.onLogIn(email, password);
  }

  handleSignUp(e) {
    e.preventDefault();
    const { email, password, c_password, name } = this.state;
    if (!email || !password || !c_password || !name) {
      return this.setState({ error: true });
    }
    this.props.onSignUp(email, password, c_password, name);
  }

  render() {
    const { error, email, password, name, c_password } = this.state;
    const { loading } = this.props;

    return (
      <div className={Style.view}>
        <div className={Style.box}>
          <div className={Style.user}>
            <i className="fas fa-user" />
          </div>
          <form className={Style.form} onSubmit={this.handleSignIn}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15
              }}
            >
              <span>
                {" "}
                <input
                  checked
                  name="type"
                  type="radio"
                  value={"login"}
                  onChange={this.handleChange}
                />{" "}
                Login{" "}
              </span>
              <span>
                {" "}
                <input
                  name="type"
                  type="radio"
                  value={"cadastro"}
                  onChange={this.handleChange}
                />{" "}
                Cadastro{" "}
              </span>
            </div>

            {this.state.type === "cadastro" ? (
              <div>
                <label className={Style.label} htmlFor="name">
                  Nome
                </label>
                <div className={Style.input}>
                  <i className={joinClasses(Style.icon, "fas fa-lock")} />
                  <input
                    id="name"
                    name="name"
                    type="name"
                    value={name}
                    className={Style.field}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            ) : null}

            <label className={Style.label} htmlFor="email">
              Email
            </label>
            <div className={Style.input}>
              <i className={joinClasses(Style.icon, "far fa-user")} />
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                className={Style.field}
                onChange={this.handleChange}
              />
            </div>
            <label className={Style.label} htmlFor="password">
              Senha
            </label>
            <div className={Style.input}>
              <i className={joinClasses(Style.icon, "fas fa-lock")} />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                className={Style.field}
                onChange={this.handleChange}
              />
            </div>
            {this.state.type === "cadastro" ? (
              <div>
                <label className={Style.label} htmlFor="c_password">
                  Confirmação de senha
                </label>
                <div className={Style.input}>
                  <i className={joinClasses(Style.icon, "fas fa-lock")} />
                  <input
                    id="c_password"
                    name="c_password"
                    type="password"
                    value={c_password}
                    className={Style.field}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            ) : null}
            {this.renderError(error)}
            <div className={Style.buttons}>
              {this.state.type === "cadastro" ? (
                <Button
                  className={Style.button}
                  onClick={this.handleSignUp}
                  text="Cadastrar"
                  type="button"
                  disabled={loading}
                />
              ) : (
                <Button
                  className={Style.button}
                  text="Entrar"
                  type="submit"
                  disabled={loading}
                />
              )}
            </div>
            {this.state.type === "login" ? (
              <div className={Style.buttons}>
                <Button
                  className={Style.button}
                  onClick={this.handleGuestSignIn}
                  text="Entrar como visitante"
                  type="button"
                  disabled={loading}
                />
              </div>
            ) : null}
          </form>
          <Loader loading={loading} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Login);

Login.propTypes = {
  /** */
  loading: PropTypes.bool,
  /** */
  onLogIn: PropTypes.func,
  /** */
  onSignUp: PropTypes.func,
  /** */
  onGoogleLogIn: PropTypes.func,
  /** */
  onFacebookLogIn: PropTypes.func,
  /** */
  throwError: PropTypes.func
};
