import Alert from 'react-bootstrap/Alert';
import PropTypes from "prop-types";


const MessageBox = ({childern, variant}) => {
  return (
    <Alert variant={variant || 'info'}>{childern}</Alert>
  )
}

MessageBox.propTypes = {
  childern: PropTypes.node,
  variant: PropTypes.string
}
export default MessageBox




