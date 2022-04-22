import { Button, notification, Space } from 'antd'
import '../assets/style.css'
import PropTypes from 'prop-types'
import React from 'react'

const openNotificationWithIcon = ({ type, message, description, placement }) => {
  openNotificationWithIcon.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    description: PropTypes.string,
    placement: PropTypes.string,
  }
  notification[type]({
    style: {
      zIndex: 99999,
    },
    message: message,
    description: description,
    placement,
  })
}
export default openNotificationWithIcon
