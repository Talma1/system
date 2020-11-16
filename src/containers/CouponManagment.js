import React, {Component} from 'react';
import CouponTable from "../components/coupons-table";
import {connect} from "react-redux";
import {getComapnyCouponsAction} from "../actions/couponsActions";
import {
    Divider, Header, Icon, Placeholder, Segment,
  } from 'semantic-ui-react';
import AddNewCoupon from "../components/add-coupon";

class CouponManagment extends Component{

    constructor(){
        super();
        this.state = {isLoading:true, coupons:[]};
    }
    componentDidMount() {
        getComapnyCouponsAction(this.props.userId).then((data)=>{
            this.setState({isLoading: false, coupons: data});
        });  // GET request
        
    }

    render(){
        const {isLoading, coupons} = this.state
        return(
            <Segment>
                <Header as="h2" icon textAlign="center">
                <Icon name="user" circular />
                <Header.Content>Coupon</Header.Content>
                <Header.Subheader>
                    Manage the coupon&apos; attributes
                </Header.Subheader>
                </Header>
                <Divider />
                {isLoading && (
                <Placeholder fluid>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                )}
                {!isLoading && (
                    <div className= "Coupon-managment-page">
                        <AddNewCoupon/>
                        <CouponTable perPage={10} coupons={coupons}/>
                    </div>
                )}
            </Segment>
        )
    }

}

const mapStateToProps = state => {
	return {
		userId: state.usersReducer.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
        
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (CouponManagment);
