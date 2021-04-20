import { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import * as counterpariesService from '../../Services/counterpartiesService';
import InLineError from '../common/InLineError/InLineError';

export class AddCounterpartyModal extends Component {
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
            name: event.target.CounterpartyName.value,
            vat: event.target.vat.value,
            address: event.target.address.value,
            cityName: event.target.cityName.value,
        }

        counterpariesService.post(counterparty)
            .then(response => {
                if (response.status === 400) {
                    console.log("Response status 400")
                    this.setState({ responseStatus: 'BadRequest' });
                }
                else if (response.ok) {
                    console.log("Response status OK")
                    this.setState({ responseStatus: 'Created' });
                }

                return response.json();
            })
            .catch(error => console.log(error))
            .then(data => {
                console.log(data);
                console.log(this.state.responseStatus)
                if (this.state.responseStatus === 'Created') {
                    alert("Counterparty was successfully added.");
                    this.setState({ errors: {}, responseStatus: '' })
                    this.props.onHide();
                }
                else if (this.state.responseStatus = 'BadRequest' && data.errors == null) {
                    console.log(data);
                    this.setState({ errors: data })
                }
                else {
                    console.log(data.errors);
                    this.setState({ errors: data.errors })
                }
            })

    }

    onClickCloseButtonHandler() {
        this.props.onHide();
        this.setState({ errors: {}, responseStatus: '' })
    }

    render() {
        console.log("render modal form");
        const errors = this.state.errors;
        console.log(errors);
        console.log(this.props.show)
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
                            Add Counterparty
                        </Modal.Title>
                        <Button variant="danger" onClick={this.onClickCloseButtonHandler}>Close</Button>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.onSubmitHandler}>                                    
                                    <Form.Group controlId='CounterpartyName'>
                                        <Form.Label>Counterparty Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='CounterpartyName'
                                            required
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
                                            placeholder='City'
                                        />
                                        <InLineError field='CityName' errors={errors} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>
                                            Add Counterparty
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
