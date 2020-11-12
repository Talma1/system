import React, { useState, useEffect } from 'react'
import {
  Button, Form, Grid, Image, Message, Modal,
} from 'semantic-ui-react'
import {editCouponAction} from '../../../actions/couponsActions';


const EditCoupon = (coupon) =>{
    const fields = ["personalNumber", "username"];
    coupon = coupon["coupon"]
    const [fieldsState, setFieldsState] = useState(coupon)
    const [modalOpen, setModalOpen] = useState(false)
    console.log(fieldsState);
    
    useEffect(() => {
        setFieldsState(coupon)
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
          <Modal.Header>Edit Coupon</Modal.Header>
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
                  editCouponAction(fieldsState);
                  setModalOpen(!modalOpen)
                }}
            />
        </Modal.Actions>
    </Modal>
    );
}

export default EditCoupon;
