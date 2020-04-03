import { connect } from 'react-redux';
import Play from '../Pages/Play';

const mapStateToProps = state => ({
  socket: state.blindReducer.socket,
  admin: state.blindReducer.admin,
  userName: state.blindReducer.userName,
});

export default connect(mapStateToProps, null)(Play);
