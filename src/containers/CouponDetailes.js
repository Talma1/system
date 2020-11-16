import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {
    Divider, Grid, Header, Icon, Placeholder, Segment, Table,
  } from 'semantic-ui-react';
import {getCouponDetails} from '../actions/couponsActions';


const CouponDetails = (props) => {

    const [coupon, setcoupon] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [couponId, setcouponId] = useState(null)

    useEffect(()=>{
        if(!coupon && !couponId){
            setIsLoading(true);
            let temp_coupon_id = getcouponId();
            setcouponId(temp_coupon_id);
            getCouponDetails(temp_coupon_id).then((data)=>{
                setcoupon(data);
                setIsLoading(false);
            })
        }
    }, [])
    
    const getcouponId = () => {
        const iscouponIdExists = typeof props.match.params.couponId !== 'undefined';
        return (iscouponIdExists ? props.match.params.couponId : props.couponId);
    }

    return(
        <Segment>
        <Header>
            <Icon name="coupon" />
            <Header.Content>coupon Details</Header.Content>
        </Header>
        <Divider hidden />
        {isLoading && (
            <Placeholder fluid>
            <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Paragraph>
            </Placeholder>
        )}
        
        {!isLoading && coupon && (
            <Grid stackable>
            <Grid.Row columns={1}>
                <Grid.Column width={12}>
                <Table basic="very">
                    <Table.Body>
                    {Object.keys(coupon).map((key) => (
                        <Table.Row key={key}>
                        <Table.Cell collapsing>
                            <strong>
                            {key}
                            </strong>
                        </Table.Cell>
                        <Table.Cell>{coupon[key]}</Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table>
                </Grid.Column>
            </Grid.Row>
            </Grid>
        )}
        </Segment>
    )

}



const mapStateToProps = state => {
	return {
		couponId: state.couponsReducer.couponId, 
	}
}

const mapDispatchToProps = dispatch => {
	return {
        
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (CouponDetails);