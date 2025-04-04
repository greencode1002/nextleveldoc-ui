import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPayPalTransactions } from '../../../store/actions';
import TableContainer from '../../../Components/Common/TableContainer';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Transactions = () => {
    document.title = "Doctor Panel | Transactions List";

    const dispatch = useDispatch();

    // Make sure we're accessing the correct state property
    const { transactions } = useSelector((state) => state?.Doctor);

    useEffect(() => {
        dispatch(getPayPalTransactions());
    }, [dispatch]);



    const handleValidDate = date => {
        const date1 = moment(new Date(date)).format("DD MMM Y");
        return date1;
    };

    const handleValidTime = (time) => {
        const time1 = moment(new Date(time)).format("hh:mm A");
        return time1;
    };

    const columns = useMemo(() => [
        {
            Header: "Date & Time",
            accessor: "created_at",
            Cell: (cellProps) => (
                <div>
                    {handleValidDate(cellProps.row.original.created_at)},{" "}
                    <small className="text-muted">{handleValidTime(cellProps.row.original.created_at)}</small>
                </div>
            ),
        },
        {
            Header: "Patient ID",
            accessor: "patient_id",
        },
        {
            Header: "Symptom ID",
            accessor: "symptom_id",
        },
        {
            Header: "Amount(CAD)",
            accessor: "amount",
            filterable: true,
        },
        {
            Header: "Payment",
            accessor: "payment_status",
            Cell: (cell) => {
                return <React.Fragment>
                    {cell.value === 1 ? <span className="badge badge-soft-success text-uppercase">{'Complete'}</span>
                        : <span className="badge badge-soft-warning text-uppercase">{'Pending'}</span>
                    }
                </React.Fragment>;
            },
        },
    ], []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xxl={12}>
                            <Card>
                                <CardBody>
                                    <div>
                                        <TableContainer
                                            columns={columns}
                                            data={transactions || []}
                                            isGlobalFilter={true}
                                            customPageSize={10}
                                            className="custom-header-css"
                                            divClass="table-responsive table-card mb-3"
                                            tableClass="align-middle table-nowrap"
                                            theadClass="table-light"
                                            SearchPlaceholder='Search for Patient...'
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Transactions;