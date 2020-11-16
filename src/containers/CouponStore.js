import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {
    Button, Divider, Header, Icon, Placeholder, Segment, Card, Label
  } from 'semantic-ui-react';
import {getCouponsListAction} from "../actions/couponsActions";
import {purchaseCouponAction} from "../actions/usersActions";



const CouponStore = (props) =>{
    const [coupons, setCoupons] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        if(!coupons){
            setIsLoading(true);
            getCouponsListAction().then((data)=>{
                setCoupons(data);
                setIsLoading(false);
            })
        }
    }, [])
   
    const handleCouponPurchase = (coupon) =>{ // add to user.coupons
        purchaseCouponAction(coupon, props.userId);
    }

    return(
        <Segment>
            <Header as="h2" icon textAlign="center">
            <Icon name="shopping cart" circular />
            <Header.Content>Coupon Store</Header.Content>
            <Header.Subheader>
                Buy Coupons for Better Shopping Experience Worldwide
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
                                <Card.Header>{coupon.title}</Card.Header>
                                <Card.Description>{coupon.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Label>
                                    <Icon name='dollar sign' /> {coupon.price}
                                </Label>
                                <Button basic color="green" content="Purchase" onClick={handleCouponPurchase(coupon)}/>
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

export default connect( mapStateToProps, mapDispatchToProps ) (CouponStore);