// Imports
import React from 'react'
import SmartDataTable from 'react-smart-data-table'
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react'
import ViewCompany from './smart-table/company-buttons/view-company'
import EditCompany from './smart-table/company-buttons/edit-company'
import DeleteCompany from './smart-table/company-buttons/delete-company'

const CompaniesTable = ({
  perPage, companies
}) => {
  console.log(companies);
  const companiesTableHeaders = (companies?.length > 0) ? {
    tableActions: {
      text: 'Actions',
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index) => {
        return (<>
          <ViewCompany companyID={(companies[index]?.personalNumber !== undefined)? companies[index].personalNumber: "" } />
          <EditCompany company={companies[index]} />
          <DeleteCompany companyID={(companies[index]?.personalNumber !== undefined)? companies[index].personalNumber: "" } />
        </>)
      },
    },
  } : {}

  // table columns
  const columns = [
    'personalNumber', 'avatar', 'username', 'tableActions',
  ]
  return (
    <SmartDataTable
      data={companies}
      headers={companiesTableHeaders}
      name="companies-table"
      parseImg={{
        className: 'ui avatar image',
      }}
      withLinks
      className="ui selectable table"
      emptyTable={(
        <Message content="There are no companies available to display." />
      )}
      orderedHeaders={columns}
      hideUnordered
      sortable
      perPage={perPage}
    />
    
  )
}


const mapStateToProps = state => {
	return {
		companies: state.usersReducer.companies
	}
}

const mapDispatchToProps = dispatch => {
	return {
        
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (CompaniesTable);
