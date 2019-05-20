import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { joinClasses } from '../../utils/classUtils'
import { mapDispatchToProps } from './storeHelper'
import { connect } from 'react-redux'

const Style = {
  homepage:   'homepage',
  info:       'homepage__info',
  copyrights: 'homepage__copyrights',
  contact:    'homepage__contact',
  animation:  'animation-fade-in',
}
class Homepage extends PureComponent {
  constructor() {
    super()

    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    this.props.onTextCopy()
  }

  render() {
    return (
      <div className={ Style.homepage }>
        <div className={ joinClasses(Style.info, Style.animation) }>
          <h1 style={{ textAlign: 'center' }}> Ranking de vitórias </h1>
          <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, width: "100%", marginTop: 20, background: "#eee", borderRadius: 12 , color: "#aaa" }}>
              <span> 1 - Nicolas </span> <span>  5 vitórias </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, width: "100%", marginTop: 20, background: "#eee", borderRadius: 12 , color: "#aaa" }}>
              <span> 2 - Bruno </span> <span>  4 vitórias </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, width: "100%", marginTop: 20, background: "#eee", borderRadius: 12 , color: "#aaa" }}>
              <span> 3 - Edgar </span> <span>  3 vitórias </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Homepage)

Homepage.propTypes = {
  /** */
  onTextCopy: PropTypes.func,
}
