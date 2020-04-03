import { connect } from 'react-redux';
import Loading from '../Pages/Loading';
import * as actions from '../redux/actions';

const mapStateToProps = state => ({
  socket: state.blindReducer.socket,
  userName: state.blindReducer.userName,
  addedMusics: state.blindReducer.addedMusics,
  admin: state.blindReducer.admin,
});

const mapDispatchToProps = dispatch => ({
  setSocket: payload => dispatch(actions.setSocket(payload)),
  setAdmin: payload => dispatch(actions.setAdmin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
