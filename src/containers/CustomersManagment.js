import React, {Component} from 'react';
import { connect } from 'react-redux';
import CustomersTable from "../components/customers-table";
import {getCustomersListAction} from "../actions/usersActions";
import {
    Divider, Header, Icon, Placeholder, Segment,
  } from 'semantic-ui-react'

class CustomersManagment extends Component{

    constructor(){
        super();
        this.state = {isLoading:true};
    }

    async componentDidMount() {
        await this.props.getCustomersList();   // GET request
        this.setState({isLoading: false});
    }

    render(){
        const {isLoading} = this.state
        return(
            <Segment>
                <Header as="h2" icon textAlign="center">
                <Icon name="user" circular />
                <Header.Content>Customers</Header.Content>
                <Header.Subheader>
                    Manage the customers&apos; attributes
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
                    <div className= "Customers-managment-page">
                        <CustomersTable perPage={10}/>
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
        getCustomersList: () => {
            dispatch(getCustomersListAction());
        }
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (CustomersManagment);