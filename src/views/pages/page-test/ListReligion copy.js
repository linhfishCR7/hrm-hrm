import React, { useState } from 'react'
import { CContainer, CForm } from '@coreui/react'
const Addmoreinput = () => {
  const [inputList, setinputList] = useState([
    { firstName: '', lastName: '', email: '', department: '' },
  ])

  const handleinputchange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setinputList(list)
  }

  const handleremove = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setinputList(list)
  }

  const handleaddclick = () => {
    setinputList([...inputList, { firstName: '', lastName: '', email: '', department: '' }])
  }

  const onSubmit = (event) => {
    event.preventDefault()
    inputList.map((item) => alert(item.email))
  }
  return (
    <CContainer className="content">
      <div className="row">
        <div className="col-sm-12">
          <h5 className="mt-3 mb-4 fw-bold">Dynamically add/remove inputs fields reactjs </h5>
          <CForm onSubmit={onSubmit}>
            {inputList.map((x, i) => {
              return (
                <div className="row mb-3" key={i}>
                  <div className="form-group col-md-2">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter First Name"
                      onChange={(e) => handleinputchange(e, i)}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Last Name"
                      onChange={(e) => handleinputchange(e, i)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      onChange={(e) => handleinputchange(e, i)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Department</label>
                    <select
                      name="department"
                      className="form-control"
                      onChange={(e) => handleinputchange(e, i)}
                    >
                      <option value="1" key="1">
                        1
                      </option>
                      <option value="2" key="2">
                        2
                      </option>
                      <option value="3" key="3">
                        3
                      </option>
                      <option value="4" key="4">
                        4
                      </option>
                    </select>
                  </div>
                  <div className="form-group col-md-2 mt-4">
                    {inputList.length !== 1 && (
                      <button className="btn btn-danger mx-1" onClick={() => handleremove(i)}>
                        Remove
                      </button>
                    )}
                    {inputList.length - 1 === i && (
                      <button className="btn btn-success mt-4" onClick={handleaddclick}>
                        Add More
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
            <div className="row mb-3">
              <div className="form-group col-md-3">
                <button className="btn btn-info mt-4" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </CForm>
        </div>
      </div>
    </CContainer>
  )
}
export default Addmoreinput
