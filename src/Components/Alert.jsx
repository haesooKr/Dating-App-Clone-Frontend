import React from 'react'
import './scss/Alert.scss';

const getStyle = (props) => {
  let baseClass = "alert ";
  if(props.alert.error)
    baseClass = baseClass + "alert-danger"
  else {
    baseClass = baseClass + "alert-primary";
  }
  return baseClass;
}

const Alert = props => {
  return (
    <div className={getStyle(props)} role="alert">
      { props.alert.body }
    </div>
  )
}

export default Alert;