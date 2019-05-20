import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps } from './storeHelper'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'

const Style = {
  navigation: 'navigation',
  list:       'navigation__list',
  item:       'navigation__list__item',
}

const Navigation = ({ logOut }) => (
  <div className={ Style.navigation }>
    <div className={ Style.list }>
      <Link className={ Style.item } to='/'>Home</Link>
      <Link className={ Style.item } to='/training'>Treino</Link>
      <Link className={ Style.item } to='/test'>Disputa</Link>
      {/* <Link className={ Style.item } to='/admin'>PYTANIA</Link> */}
    </div>
    <Button
      text='Log out'
      onClick={ logOut }
    />
  </div>
)

export default connect(null, mapDispatchToProps)(Navigation)

Navigation.propTypes = {
  logOut: PropTypes.func,
}
