import React, {Component} from 'react';
import { connect } from 'react-redux';

import CompaniesTable from "../components/companies-table";
import {getCompaniesListAction} from "../actions/usersActions";
import AddNewUser from "../components/add-user";
import {
    Divider, Header, Icon, Placeholder, Segment,
  } from 'semantic-ui-react'

class CompanyManagment extends Component{

    constructor(){
        super();
        this.state = {isLoading:true};
    }

    async componentDidMount() {
        await this.props.getCompanyList();   // GET request
        this.setState({isLoading: false});
    }

    render(){
        const {isLoading} = this.state
        return(
            <Segment>
                <Header as="h2" icon textAlign="center">
                <Icon name="shopping cart" circular />
                <Header.Content>Company</Header.Content>
                <Header.Subheader>
                    Manage the company&apos; attributes
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
                    <div className= "Company-managment-page">
                        <AddNewUser userType="Company"/>
                        <CompaniesTable perPage={10}/>
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
        getCompanyList: () => {
            dispatch(getCompaniesListAction());
        }
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (CompanyManagment);