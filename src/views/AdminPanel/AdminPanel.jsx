import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'
import UniversalTable from '../../components/UniversalTable/UniversalTable'
import QuestionForm from '../../components/QuestionForm/QuestionForm'
import QuestionDataRow from '../../components/QuestionDataRow/QuestionDataRow'
import Button from '../../components/Button/Button'

const TABLE_HEADERS = ['Pytanie', 'Opcje', 'Odpowiedź', 'Akcje']

const Style = {
  wrapper: 'admin-panel',
}

const AdminPanel = ({ questions, onQuestionAdd, onQuestionEdit, form, onFormHide }) => (
  <div className={Style.wrapper}>
    <QuestionForm />
    <UniversalTable
      data={questions}
      headers={TABLE_HEADERS}
      renderRow={renderQuestionDataRow(onQuestionEdit)}
    />
    <Button 
      text={form ? "close" : "add"}
      className={Style.add}
      onClick={form ? onFormHide : onQuestionAdd}
      float
    />
  </div>
)

export default connect(mapStoreToProps, mapDispatchToProps)(AdminPanel)

AdminPanel.propTypes = {
  /** */
  questions:      PropTypes.array,
  /** */
  form:           PropTypes.bool,
  /** */
  onQuestionAdd:  PropTypes.func,
  /** */
  onQuestionEdit: PropTypes.func,
  /** */
  onFormHide:     PropTypes.func,
}

const renderQuestionDataRow = (onEdit) => (props, index) => (
  <QuestionDataRow
    key={index}
    onEdit={onEdit}
    {...props}
  />
)
