import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { conditionClass } from '../../utils/classUtils'
import { TRAINING } from '../../views/Training/Training'

const Style = {
  box:     'rules',
  rules:   'rules__text',
  button:  'rules__start',
  hidden:  'rules__hidden',
  selects: 'rules__selects',
  select:  'rules__select',
  list:    'rules__select__list',
}

class Rules extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props
  }

  renderCategoryAndLevelSelect(mode, onChange) {
    if (mode === TRAINING) {
      return
    }
    return (
      <div className={Style.selects}>
        <div className={Style.select}>
          <label htmlFor='category'>
            Categorias
          </label>
          <select
            id='category'
            name='category'
            onChange={onChange}
            className={Style.list}
          >
            <option value='All'>Todos</option>
            <option value='Computers'>Computação</option>
            <option value='World'>Conhecimentos gerais</option>
          </select>
        </div>
      </div>
    )
  }

  render() {
    const { started, rules, mode, onClick, onChange } = this.props 
    return (
      <div className={conditionClass(!started, Style.box, Style.hidden)}>
        <div className={Style.rules}>
          {rules}
        </div>
        {this.renderCategoryAndLevelSelect(mode, onChange)}                
        <Button 
          className={Style.button}
          onClick={onClick}
          text='Iniciar'
        />
      </div>
    )
  }
}

export default Rules

Rules.propTypes = {
  /** */
  className: PropTypes.string,
  /** */
  rules:     PropTypes.string,
  /** */
  started:   PropTypes.bool,
  /** */
  mode:      PropTypes.string,
  /** */
  onClick:   PropTypes.func,
  /** */
  onChange:  PropTypes.func,
}
