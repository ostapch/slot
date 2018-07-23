import React from 'react';
import { connect } from 'react-redux';
import './Errors.css';
import { getErrors } from '../../selectors/errorsSelector';

const mapStateToProps = (state) => ({
  errors: getErrors(state),
});

const Errors = ({ errors }) => errors && (
  <div className="errors">
    {errors.map(error => <code key={error}>{error}</code>)}
  </div>
);

export default connect(mapStateToProps)(Errors);
