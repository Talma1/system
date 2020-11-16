// Imports
import React from 'react'
import SmartDataTable from 'react-smart-data-table'
import { Message } from 'semantic-ui-react'
import ViewCoupon from './smart-table/coupon-buttons/view-coupon'
import EditCoupon from './smart-table/coupon-buttons/edit-coupon'
import DeleteCoupon from './smart-table/coupon-buttons/delete-coupon'

const CouponsTable = ({
  perPage, coupons
}) => {
  const couponsTableHeaders = (coupons?.length > 0) ? {
    tableActions: {
      text: 'Actions',
      invisible: false,
      sortable: false,
      filterable: false,
      transform: (value, index) => {
        return (<>
          <ViewCoupon couponID={(coupons[index]?.personalNumber !== undefined)? coupons[index].personalNumber: "" } />
          <EditCoupon coupon={coupons[index]} />
          <DeleteCoupon couponID={(coupons[index]?.personalNumber !== undefined)? coupons[index].personalNumber: "" } />
        </>)
      },
    },
  } : {}

  // table columns
  const columns = [
    'id', 'title', 'price', 'company', 'image', 'tableActions',
  ]
  return (
    <SmartDataTable
      data={coupons}
      headers={couponsTableHeaders}
      name="coupons-table"
      parseImg={{
        className: 'ui avatar image',
      }}
      withLinks
      className="ui selectable table"
      emptyTable={(
        <Message content="There are no coupons available to display." />
      )}
      orderedHeaders={columns}
      hideUnordered
      sortable
      perPage={perPage}
    />
    
  )
}


export default CouponsTable;
