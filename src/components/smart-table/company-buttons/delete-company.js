// Imports
import React, { useState } from 'react'
import {
  Button, Confirm, Modal,
} from 'semantic-ui-react'
import { deleteCompanyAction } from '../../../actions/usersActions';

const DeleteCompany = ({ companyID }) => {
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
          deleteCompanyAction(companyID);
        }}
        header="Confirm company deletion"
        content={(
          <Modal.Content>
            {(
              <p>{`Are you sure you want to delete the company #${companyID} ?`}</p>
            )}
          </Modal.Content>
        )}
      />
    </>
  )
}

export default DeleteCompany
