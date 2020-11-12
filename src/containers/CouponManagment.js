import React, {Component} from 'react';
import { connect } from 'react-redux';
import CouponTable from "../components/coupons-table";
import {getCouponListAction} from "../actions/couponsActions";
import {
    Divider, Header, Icon, Placeholder, Segment,
  } from 'semantic-ui-react'

class CouponManagment extends Component{

    constructor(){
        super();
        this.state = {isLoading:true};
    }

    async componentDidMount() {
        await this.props.getCouponList();   // GET request
        this.setState({isLoading: false});
    }

    render(){
        const {isLoading} = this.state
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
                        <CouponTable perPage={10}/>
                    </div>
                )}
            </Segment>
        )
    }

}


const mapStateToProps = state => {
	return {
		
	}
}

const mapDispatchToProps = dispatch => {
	return {
        getCouponList: () => {
            dispatch(getCouponListAction());
        }
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (CouponManagment);