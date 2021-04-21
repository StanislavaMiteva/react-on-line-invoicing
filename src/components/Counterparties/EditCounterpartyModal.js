import { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import * as counterpariesService from '../../Services/counterpartiesService';
import InLineError from '../common/InLineError/InLineError';

export class EditCounterpartyModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            responseStatus: ''
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onClickCloseButtonHandler = this.onClickCloseButtonHandler.bind(this);
    }

    onSubmitHandler(event) {
        event.preventDefault();

        let counterparty = {
            id: event.target.CounterpartyId.value,
            name: event.target.CounterpartyName.value,
            vat: event.target.vat.value,
            address: event.target.address.value,
            cityName: event.target.cityName.value,
        }

        counterpariesService.put(counterparty)
            .then(response => {
                if (response.status === 400) {
                    console.log("Response status 400")
                    this.setState({ responseStatus: 'BadRequest' });
                }
                else if (response.ok) {
                    console.log("Response status OK")
                    this.setState({ responseStatus: 'OK' });
                }
                else if (response.status === 404) {
                    console.log("Response status 404")
                    this.setState({ responseStatus: 'NotFound' });
                }

                return response.json();
            })
            .catch(error => console.log(error))
            .then(data => {
                console.log(data);
                console.log(this.state.responseStatus)
                if (this.state.responseStatus === 'OK') {
                    alert("Counterparty was successfully edited.");
                    this.setState({ errors: {}, responseStatus: '' })
                    this.props.onHide();
                }
                else if (this.state.responseStatus === 'BadRequest' && data.errors == null) {
                    console.log(data);
                    this.setState({ errors: data })
                }
                else if (this.state.responseStatus === 'BadRequest' && data.errors != null) {
                    console.log(data.errors);
                    this.setState({ errors: data.errors })
                }
            })

    }

    onClickCloseButtonHandler() {
        this.setState({ errors: {}, responseStatus: '' })
        this.props.onHide();
    }

    render() {
        console.log("render modal form");
        const errors = this.state.errors;
        console.log(errors);
        console.log(this.props)
        return (
            <div className='container'>
                <Modal
                    {...this.props}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Edit Counterparty
                        </Modal.Title>
                        <Button variant="danger" onClick={this.onClickCloseButtonHandler}>Close</Button>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.onSubmitHandler}>                                    
                                <Form.Group controlId='CounterpartyId'>
                                        <Form.Label>Counterparty Id</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='CounterpartyId'
                                            required
                                            disabled
                                            defaultValue={this.props.counterparty.id}
                                            placeholder='Counterparty Id'
                                        />
                                        <InLineError field='Id' errors={errors} />
                                    </Form.Group>
                                    <Form.Group controlId='CounterpartyName'>
                                        <Form.Label>Counterparty Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='CounterpartyName'
                                            required
                                            defaultValue={this.props.counterparty.name}
                                            placeholder='Counterparty Name'
                                        />
                                        <InLineError field='Name' errors={errors} />
                                    </Form.Group>
                                    <Form.Group controlId='vat'>
                                        <Form.Label>Bulstat</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='vat'
                                            required
                                            defaultValue={this.props.counterparty.vat}
                                            placeholder='Bulstat'
                                        />
                                        <Form.Text className="text-muted">
                                            Personal number for individuals.
                                        </Form.Text>
                                        <InLineError field='VAT' errors={errors} />
                                    </Form.Group>
                                    <Form.Group controlId='address'>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='address'
                                            required
                                            defaultValue={this.props.counterparty.address}
                                            placeholder='Address'
                                        />
                                        <InLineError field='Address' errors={errors} />
                                    </Form.Group>
                                    <Form.Group controlId='cityName'>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='cityName'
                                            required
                                            defaultValue={this.props.counterparty.cityName}
                                            placeholder='City'
                                        />
                                        <InLineError field='CityName' errors={errors} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>
                                            Update Counterparty
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    {/* <Modal.Footer>
                        <Button variant="danger" onClick={this.onClickCloseButtonHandler}>Close</Button>
                    </Modal.Footer> */}

                </Modal>
            </div>
        );
    }
}
