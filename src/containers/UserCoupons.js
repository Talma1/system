import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {
    Divider, Header, Icon, Placeholder, Segment, Card, Label
  } from 'semantic-ui-react'
import {getCustomerCouponsAction} from "../actions/couponsActions";


const UserCoupons = (props) =>{

    const [coupons, setCoupons] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=>{
        if(!coupons){
            setIsLoading(true);
            getCustomerCouponsAction(props.userId).then((data)=>{
                setCoupons(data);
                setIsLoading(false);
            })
        }
    }, [])
   
    return(
        <Segment>
            <Header as="h2" icon textAlign="center">
            <Icon name="user" circular />
            <Header.Content>User Coupons</Header.Content>
            <Header.Subheader>
                Coupons you purchased
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
                <Card.Group>
                    {coupons.map((coupon)=>{
                        <Card>
                            <Card.Content>
                                <Icon name="money bill alternate"/>
                                <Card.Header>{coupon.header}</Card.Header>
                                <Card.Description>{coupon.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Label>
                                    <Icon name='dollar sign' /> {coupon.price}
                                </Label>
                            </Card.Content>
                        </Card>
                    })}
                </Card.Group>
            )}
        </Segment>
    )
    

}



const mapStateToProps = state => {
	return {
        userId: state.usersReducer.userId,
	}
}

const mapDispatchToProps = dispatch => {
	return {
        
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (UserCoupons);