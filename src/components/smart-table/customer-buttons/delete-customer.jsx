// Imports
import React, { useState } from 'react'
import {
  Button, Confirm, Modal,
} from 'semantic-ui-react'
import { deleteCustomerAction } from '../../../actions/usersActions';

const DeleteCustomer = ({ userID }) => {
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
          deleteCustomerAction(userID);
        }}
        header="Confirm customer deletion"
        content={(
          <Modal.Content>
            {(
              <p>{`Are you sure you want to delete the customer #${userID} ?`}</p>
            )}
          </Modal.Content>
        )}
      />
    </>
  )
}

export default DeleteCustomer
