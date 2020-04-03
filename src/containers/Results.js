import { connect } from 'react-redux';
import Results from '../Pages/Results';

const mapStateToProps = state => ({
  socket: state.blindReducer.socket,
  userName: state.blindReducer.userName,
});

export default connect(mapStateToProps, null)(Results);
