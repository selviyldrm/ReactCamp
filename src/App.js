import React, { Component } from 'react'
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from 'reactstrap'

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
   this.setState({cart:newCart})
  }
  render(){
    let categoryInfo={title:"Category Liste"};
  let productInfo={title:"Product Liste"};
     return (
  <div >
       <Container>
         <Navi cart={this.state.cart}/>
       <Row>
        <Col xs="3">
           <CategoryList
         currentCategory={this.state.currentCategory} 
         changeCategory={this.changeCategory} 
         info={categoryInfo}/>
         </Col>

         <Col xs="9"> 
         <ProductList
          products={this.state.products} 
          addToCart={this.addToCart}
          currentCategory={this.state.currentCategory}
          info={productInfo}/>
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
