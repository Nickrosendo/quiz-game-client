import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { joinClasses } from '../../utils/classUtils'
import { mapDispatchToProps } from './storeHelper'
import { connect } from 'react-redux'
import axios from 'axios'

const Style = {
  homepage:   'homepage',
  info:       'homepage__info',
  copyrights: 'homepage__copyrights',
  contact:    'homepage__contact',
  animation:  'animation-fade-in',
}
class Homepage extends PureComponent {
  
  state = {
    leaderboards: []
  }
  constructor() {
    super()

    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/leaderboard').then(({ data }) => {
      this.setState({ leaderboards: data})
      console.log("leaderboards: ", this.state.leaderboards);
    })
    .catch(error => {
      console.error('error at getting leaderboards: ', error)
    })
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
            {
              this.state.leaderboards.sort((a,b) => b.wins - a.wins ).map( (user, index) => (
                <div key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, width: "100%", marginTop: 20, background: "#eee", borderRadius: 12 , color: "#aaa" }}>
                  <span> { index } - {user.name} </span> <span>  {user.wins} vitórias </span>
                </div>
              ))
            }
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
