import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {
    Divider, Grid, Header, Icon, Image, Placeholder, Segment, Table,
  } from 'semantic-ui-react';
import {getUserDetails} from '../actions/usersActions';


const UserDetails = (props) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [userId, setUserId] = useState(null)

    useEffect(()=>{
        if(!user && !userId){
            setIsLoading(true);
            let temp_user_id = initiateUserId();
            setUserId(temp_user_id);
            getUserDetails(temp_user_id).then((data)=>{
                delete data.coupons; // Cant be displayed like other fields.
                setUser(data);
                setIsLoading(false);
            })
        }
    }, [])
    
    const initiateUserId = () => {
        const isUserIdExists = typeof props.match.params.userId !== 'undefined';
        return (isUserIdExists ? props.match.params.userId : props.userId);
    }

    return(
        <Segment>
        <Header>
            <Icon name="user" />
            <Header.Content>User Details</Header.Content>
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
        
        {!isLoading && user && (
            <Grid stackable>
            <Grid.Row columns={2}>
                <Grid.Column width={4} textAlign="center" verticalAlign="top">
                {(user.avatar) && (
                    <Image
                    src={(user.avatar)}
                    verticalAlign="top"
                    centered
                    circular
                    size="small"
                    />
                )}
                </Grid.Column>
                <Grid.Column width={12}>
                <Table basic="very">
                    <Table.Body>
                    {Object.keys(user).map((key) => ( // remove coupons key
                        <Table.Row key={key}>
                        <Table.Cell collapsing>
                            <strong>
                            {key}
                            </strong>
                        </Table.Cell>
                        <Table.Cell>{user[key]}</Table.Cell>
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
		userId: state.usersReducer.userId, // Relevant if it's the user looking at his own details.
	}
}

const mapDispatchToProps = dispatch => {
	return {
        
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (UserDetails);