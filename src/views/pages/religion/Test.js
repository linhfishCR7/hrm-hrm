import React from 'react'

import axios from 'axios'

export default class PersonList extends React.Component {
  state = {
    persons: [],
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    axios
      .get(`http://localhost:8000/api/hrm/religions/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const persons = res.data.results
        console.log()
        this.setState({ persons })
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <ul>
        {this.state.persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    )
  }
}
