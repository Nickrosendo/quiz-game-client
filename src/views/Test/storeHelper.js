import { runTimer, stopTimer } from '../../store/actions/timer'
import { updateAppStatus } from '../../store/actions/appStatus'

export const mapStoreToProps = ({ questions, timer, appStatus }) => ({
  timer: timer.loading,
  questions,
  userLogged: appStatus.userLogged
})

export const mapDispatchToProps = (dispatch) => ({
  onTimerStart: () => dispatch(runTimer),
  onTimerStop:  () => dispatch(stopTimer),
  updateAppStatus: () => dispatch(updateAppStatus)
})

export const connectOpts = {
  areStatesEqual: (next, prev) => prev.questions === next.questions,
}
