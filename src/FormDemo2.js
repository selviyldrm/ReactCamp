import React, { Component } from 'react'
import { Form,FormGroup,Label,Input, Button } from 'reactstrap'
import alertify from 'alertifyjs'
export default class FormDemo2 extends Component {
    state={email:"",password:"",city:"",description:""}
    handleChange=event=>{
        let name=event.target.name
        let value =event.target.value
        this.setState({[name]:value})
    }
    handleSubmit=event=>{
        event.preventDefault()
        alertify.success(this.state.email +" added to db!")
        alertify.success(this.state.password +" added to db!")
        alertify.success(this.state.city +" added to db!")
        alertify.success(this.state.description +" added to db!")

    }
  render() {
    return (
      <div>
          <Form onSubmit={this.handleSubmit}>
              <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email"
               name="email"
               id="email"
               placeholder="Enter email"
                onChange={this.handleChange}
               ></Input>
              </FormGroup>
              <FormGroup>
              <Label for="password">password</Label>
              <Input type="password"
               name="password"
               id="password"
               placeholder="Enter password"
                onChange={this.handleChange}
               ></Input>
              </FormGroup>
              <FormGroup>
              <Label for="description">description</Label>
              <Input type="textarea"
               name="description"
               id="description"
               placeholder="Enter description"
                onChange={this.handleChange}
               ></Input>
              </FormGroup>
              <FormGroup>
                  <Label for="city">City</Label>
                  <Input type="select" name="city" id="city" onChange={this.handleChange}>
                      <option>Ankara</option>
                      <option>İstanbul</option>
                      <option>Adana</option>
                      <option>Hatay</option>
                      <option>İzmir</option>
                  </Input>
              </FormGroup>
              <Button type="submit">Save</Button>
          </Form>
      </div>
    )
  }
}
