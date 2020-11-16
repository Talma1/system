import React, { Component } from "react";
 
class Home extends Component {
  render() {
    return (
      <div style={{padding: '15px', fontSize: '20px'}}>
        <h2>HELLO</h2>
        <p>Welcome to the coupon store!</p>
        <p>Whether you're a customer looking for coupons or a company that wants to sell some<br/>
          this is the place for you</p>
        <p style={{fontWeight: 'bold'}}>Enjoy!</p>
      </div>
    );
  }
}
 
export default Home;