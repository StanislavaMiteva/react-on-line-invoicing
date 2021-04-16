import { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';

import * as counterpariesService from '../../Services/counterpartiesService';
import { AddCounterpartyModal } from './AddCounterpartyModal';

import './Counterparties.css';

class Counterparties extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counterparties: [],
            addModalShow: false
        }
    }

    componentDidMount() {
        counterpariesService.getAll()
            .then(data => {
                this.setState({ counterparties: data })
            })
    }

    render() {
        const counterparties = this.state.counterparties;
        let addModalClose = () => this.setState({ addModalShow: false })

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
                            <tr key={x.Id}>
                                <td>{x.Name}</td>
                                <td>{x.VAT}</td>
                                <td>{x.Address}</td>
                                <td>{x.CityName}</td>
                                <td>Edit / Delete</td>
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
                    <AddCounterpartyModal show={this.state.addModalShow} onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        );

    }
}

export default Counterparties;