// Imports
import React, { useState } from 'react'
import {
  Button, Confirm, Modal,
} from 'semantic-ui-react'
import { deleteCouponAction } from '../../../actions/couponsActions';

const DeleteCoupon = ({ couponID }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <>
      <Button
        color="red"
        icon="trash"
        size="mini"
        onClick={() => setConfirmOpen(!confirmOpen)}
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(!confirmOpen)}
        onConfirm={() => {
          deleteCouponAction(couponID);
        }}
        header="Confirm coupon deletion"
        content={(
          <Modal.Content>
            {(
              <p>{`Are you sure you want to delete the coupon #${couponID} ?`}</p>
            )}
          </Modal.Content>
        )}
      />
    </>
  )
}

export default DeleteCoupon
