import React, { Component } from 'react'
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from 'reactstrap'
import alertify from 'alertifyjs';
import {Switch , Route } from 'react-router-dom';
import CartList from './CartList';
import NotFound from './NotFound';
import FormDemo1 from './FormDemo1';
import FormDemo2 from './FormDemo2';



export default class App extends Component{
  state={currentCategory:"",products:[],cart:[]}
  changeCategory = category =>
   {
      this.setState({
         currentCategory: category.categoryName});
        this.getProducts(category.id);
        };
  componentDidMount(){
    this.getProducts()
  }
   getProducts= (categoryId)=>{
     let url="http://localhost:3000/products"
     if(categoryId){
       url+="?categoryId="+categoryId
     }
 fetch(url)  //apiye ulaşır
 .then(Response=>Response.json())   //response'ı json'a döndürür
 .then(data=>this.setState({products:data})) //state kategori değerini data yapar
   }
 
   addToCart=(product)=>{
    let newCart=this.state.cart;
   var addedItem=newCart.find(c=>c.product.id==product.id); //bu komutl her ürün  1 defa eklenir
   if(addedItem){
     addedItem.quantity+=1;
   }
   else{
     newCart.push({product:product,quantity:1});
   }
   this.setState({cart:newCart});
   alertify.success(product.productName + "added to cart!")
  }
  removeFromCart=product=>{
    let newCart=this.state.cart.filter(c=>c.product.id!==product.id)
    this.setState({cart:newCart})
    alertify.error(product.productName + "removed from cart!")
  }
  render(){
    let categoryInfo={title:"Category Liste"};
  let productInfo={title:"Product Liste"};
     return (
  <div >
       <Container>
         <Navi removeFromCart={this.removeFromCart} cart={this.state.cart}/>
       <Row>
        <Col xs="3">
           <CategoryList
         currentCategory={this.state.currentCategory} 
         changeCategory={this.changeCategory} 
         info={categoryInfo}/>
         </Col>

         <Col xs="9"> 
       <Switch>
        <Route exact path="/" render={props=>(
          <ProductList 
          {...props}
          products={this.state.products}
          addToCart={this.addToCart}
          currentCategory={this.state.currentCategory}
          info={productInfo}
          />
        )
        } />
        <Route exact path="/cart" render={props=>(
          <CartList 
          {...props}
          cart={this.state.cart}
          removeFromCart={this.removeFromCart}
          />
        )
        }/>
        <Route path="/form1"component={FormDemo1} />
        <Route path="/form2"component={FormDemo2} />
        <Route exact component={NotFound}/>
       </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
 }



  }


// function App() {
 
//   // let titleCategory="Category Liste"
// //let titleProduct="Product Liste"

// //KAPSÜLLEME(ENCAPSULATION)
//  let categoryInfo={title:"Category Liste"}
//  let productInfo={title:"Product Liste"}
//   return (
//     <div >
//       <Container>
//         <Row>
//           <Navi></Navi>
//         </Row>
//         <Row>
//          {/* <Col xs="3"> <CategoryList title={titleCategory}/></Col>
//          <Col xs="9"> <ProductList title={titleProduct}/></Col> */}
//          <Col xs="3"> <CategoryList info={categoryInfo}/></Col>
//          <Col xs="9"> <ProductList info={productInfo}/></Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default App;
