// Imports
import React, { useState } from 'react'
import {
  Button, Form, Grid, Image, Modal,
} from 'semantic-ui-react'
import { addUserAction } from '../actions/usersActions';
import {User} from "../models/users";


const AddNewUser = (userType) => {
  const fields = ["username", "password", "personalNumber"];
  const [modalOpen, setModalOpen] = useState(false)
  const [fieldsState, setFieldsState] = useState(new User());

  const changeFieldValue = ({ field, newValue }) => {
    const newState = { ...fieldsState };
    newState[field] = newValue;
    return newState;
  }

  return (
    <Modal
      trigger={(
        <Button
          color="green"
          content="Add new"
          floated="right"
          onClick={() => setModalOpen(!modalOpen)}
        />
      )}
      open={modalOpen}
      onClose={() => setModalOpen(!modalOpen)}
    >
      <Modal.Header>Add New {userType.userType}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column width={2} textAlign="center" verticalAlign="top">
                <Image
                  centered
                  src={fieldsState.avatar}
                  size="tiny"
                  verticalAlign="top"
                  circular
                />
              </Grid.Column>
              <Grid.Column width={14}>
                <Form>
                  {fields.map((field) => (
                    <Form.Input
                      fluid
                      name={field}
                      label={field}
                      placeholder={field}
                      key={field}
                      value={fieldsState[field]}
                      onChange={
                        (e, { name, value }) => setFieldsState(
                          changeFieldValue(fieldsState, { name, value }),
                        )
                      }
                    />
                  ))}
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          content="Close"
          onClick={() => setModalOpen(!modalOpen)}
        />
        <Button
          positive
          content="Save"
          onClick={() => {
            addUserAction(fieldsState);
            setModalOpen(!modalOpen)
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddNewUser
