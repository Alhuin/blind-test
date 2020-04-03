import { connect } from 'react-redux';
import Auth from '../Pages/Auth';
import * as actions from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  setUser: payload => dispatch(actions.setUser(payload)),
});

export default connect(null, mapDispatchToProps)(Auth);
