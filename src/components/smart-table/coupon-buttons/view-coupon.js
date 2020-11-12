// Imports
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const ViewCoupon = ({ couponId }) => (
  <Button
    color="blue"
    icon="eye"
    size="mini"
    as={Link}
    to={`/users/${couponId}`}
  />
)


export default ViewCoupon
