import axios from './axios'
import PropTypes from 'prop-types'
import React from 'react'

const API = async ({ REGISTER_URL, ACTION, DATA = {} }) => {
  API.propTypes = {
    REGISTER_URL: PropTypes.string,
    ACTION: PropTypes.string,
    DATA: {},
  }
  const token = localStorage.getItem('token')
  if (ACTION === 'GET') {
    return await axios.get(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  } else if (ACTION === 'DELETE') {
    return await axios.delete(REGISTER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  } else if (ACTION === 'POST') {
    return await axios.post(REGISTER_URL, DATA, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  } else if (ACTION === 'PUT') {
    return await axios.put(REGISTER_URL, DATA, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
export default API
