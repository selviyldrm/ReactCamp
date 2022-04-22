import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

export default class CategoryList extends Component {
    state = {
      categories :[]
      // categories: [
      //    { categoryId: 1, categoryName: "Beverages" },
      //   { categoryId: 2, categoryName: "Codiments" }]
      
    };
  
   componentDidMount(){
     this.getCategories()
   }
    getCategories= ()=>{
  fetch("http://localhost:3000/categories")  //apiye ulaşır
  .then(Response=>Response.json())   //response'ı json'a döndürür
  .then(data=>this.setState({categories:data})) //state kategori değerini data yapar
    }
  
     render() {
      return (
        <div>
          {/* <h3>{this.props.title}</h3> */}
          <h3>{this.props.info.title}</h3>
          <ListGroup>
            {this.state.categories.map(category => (
              <ListGroupItem active={category.categoryName===this.props.currentCategory?true:false}
               onClick={
                () => this.props.changeCategory(category)} key={category.categoryId}>
                {category.categoryName}
              </ListGroupItem>
            ))}
  
          </ListGroup>
        
        </div>
      )
    }
  }
  