import { connect } from 'react-redux';
import Results from '../Pages/Results';
import * as actions from '../redux/actions';

const mapStateToProps = state => ({
  socket: state.blindReducer.socket,
  userName: state.blindReducer.userName,
});

const mapDispatchToProps = dispatch => ({
  logout: payload => dispatch(actions.logout(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
