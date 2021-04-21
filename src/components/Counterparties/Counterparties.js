import { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';

import * as counterpariesService from '../../Services/counterpartiesService';
import { AddCounterpartyModal } from './AddCounterpartyModal';
import { EditCounterpartyModal } from './EditCounterpartyModal';

import './Counterparties.css';

class Counterparties extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counterparties: [],
            addModalShow: false,
            editModalShow: false,
            counterpartyToEdit: {}
        }
    }

    componentDidMount() {
        console.log("did mount counterparties")
        counterpariesService.getAll()
            .then(data => {
                this.setState({ counterparties: data })
            })
    }

    componentDidUpdate() {
        console.log("update counterparties")
    }

    addModalClose = () => {
        this.setState({ addModalShow: false })
        console.log("inside addModalClose")
        counterpariesService.getAll()
            .then(data => {
                this.setState({ counterparties: data })
            })

    }

    onClickEditButton = (event) => {
        const id = event.target.parentNode.parentNode.parentNode.getAttribute('id');
        const name = event.target.parentNode.parentNode.parentNode.children[0].textContent;
        const vat = event.target.parentNode.parentNode.parentNode.children[1].textContent;
        const address = event.target.parentNode.parentNode.parentNode.children[2].textContent;
        const cityName = event.target.parentNode.parentNode.parentNode.children[3].textContent;

        let counterpartyToEdit = {
            id,
            name,
            vat,
            address,
            cityName,
        }

        this.setState({ editModalShow: true, counterpartyToEdit })
    }

    editModalClose = () => {
        this.setState({ editModalShow: false })
        console.log("inside editModalClose")
        counterpariesService.getAll()
            .then(data => {
                this.setState({ counterparties: data })
            })

    }

    render() {        
        const { counterparties } = this.state;

        if (counterparties.length === 0) {
            return <span>Loading counterparties.....</span>
        }

        console.log("render counterparties")

        return (
            <div>
                <h2>All Counterparties:</h2>
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>VAT</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {counterparties.map(x =>
                            <tr key={x.Id} id={x.Id}>
                                <td>{x.Name}</td>
                                <td>{x.VAT}</td>
                                <td>{x.Address}</td>
                                <td>{x.CityName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            className='mr-2'
                                            variant='info'
                                            onClick={this.onClickEditButton}
                                        >
                                            Edit
                                        </Button>

                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button
                        className="btn-add-ctrparty"
                        variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Counterparty
                    </Button>
                    <AddCounterpartyModal show={this.state.addModalShow} onHide={this.addModalClose} />
                </ButtonToolbar>

                <EditCounterpartyModal
                    show={this.state.editModalShow}
                    onHide={this.editModalClose}
                    counterparty={this.state.counterpartyToEdit}
                />

            </div>
        );

    }
}

export default Counterparties;