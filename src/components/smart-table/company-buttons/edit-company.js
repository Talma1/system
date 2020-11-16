import React, { useState, useEffect } from 'react'
import {
  Button, Form, Grid, Modal,
} from 'semantic-ui-react'
import {editCompanyAction} from '../../../actions/usersActions';


const EditCompany = (company) =>{
    const fields = ["email", "firstName", "lastName", "password"];
    company = company["company"]
    const [fieldsState, setFieldsState] = useState(company)
    const [modalOpen, setModalOpen] = useState(false)
    console.log(fieldsState);
    
    useEffect(() => {
        setFieldsState(company)
      }, [modalOpen])

    const changeFieldValue = ({ field, newValue }) => {
        const newState = { ...fieldsState };
        newState[field] = newValue;
        return newState;
      }

    return (
        <Modal
          trigger={(
            <Button
              color="yellow"
              icon="pencil"
              size="mini"
              onClick={() => setModalOpen(!modalOpen)}
            />
          )}
          open={modalOpen}
          onClose={() => setModalOpen(!modalOpen)}
        >
          <Modal.Header>Edit Company</Modal.Header>
          <Modal.Content>
            <Modal.Description>
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column width={14}>
                            <Form>
                                {fields.map((field) => (
                                    <Form.Input
                                    fluid
                                    name={field}
                                    label={field}
                                    placeholder={field}
                                    key={field}
                                    value={fieldsState?.field}
                                    onChange={
                                        (e, { name, value }) => setFieldsState(
                                            changeFieldValue({ name, value }),
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
                  editCompanyAction(fieldsState);
                  setModalOpen(!modalOpen)
                }}
            />
        </Modal.Actions>
    </Modal>
    );
}

export default EditCompany;
