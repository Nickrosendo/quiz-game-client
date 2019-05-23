export const mapStoreToProps = ({ appStatus }) => ({
  isLoggedIn: appStatus.loggedIn,
  userLogged: appStatus.userLogged
})
