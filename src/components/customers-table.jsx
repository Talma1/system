// Imports
import React from 'react'
import SmartDataTable from 'react-smart-data-table'
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react'
import ViewCustomer from './smart-table/customer-buttons/view-customer'
import EditCustomer from './smart-table/customer-buttons/edit-customer'
import DeleteCustomer from './smart-table/customer-buttons/delete-customer'

const CustomersTable = ({
  perPage, customers
}) => {
  console.log(customers);
  const customersTableHeaders = (customers?.length > 0) ? {
    tableActions: {
      text: 'Actions',
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index) => {
        console.log("Done");
        console.log(customers);
        return (<>
          <ViewCustomer customerID={(customers[index]?.personalNumber !== undefined)? customers[index].personalNumber: "" } />
          <EditCustomer customer={customers[index]} />
          <DeleteCustomer customerID={(customers[index]?.personalNumber !== undefined)? customers[index].personalNumber: "" } />
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
      data={customers}
      headers={customersTableHeaders}
      name="customers-table"
      parseImg={{
        className: 'ui avatar image',
      }}
      withLinks
      className="ui selectable table"
      emptyTable={(
        <Message content="There are no customers available to display." />
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
        customers: state.usersReducer.customers
	}
}

const mapDispatchToProps = dispatch => {
	return {
        
	}
}

export default connect( mapStateToProps, mapDispatchToProps ) (CustomersTable);
