import React, { useEffect, useMemo } from 'react';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import TableContainer from '../../../Components/Common/TableContainer';
import { deleteSymptomData, getPatientsSymptomsList } from '../../../store/Patients/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';

const SymptomsList = ({ onEditClick }) => {

    const dispatch = useDispatch()
    const { symptomsList } = useSelector((state) => state?.Patient);


    useEffect(() => {
        dispatch(getPatientsSymptomsList());
    }, [])



    const handleDeleteSymptoms = (value) => {
        dispatch(deleteSymptomData(value.symptom_id))
    }


    const handleValidDate = date => {
        const date1 = moment(new Date(date)).format("DD MMM Y");
        return date1;
    };
    const handleValidTime = (time) => {
        const time1 = moment(new Date(time)).format("hh:mm A");
        return time1;
    };

    const symptomsColumns = useMemo(() => [
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
            Header: "Patient Name",
            accessor: "patient_name",
            filterable: true,
        },
        {
            Header: "Patient Age",
            accessor: "age",
            filterable: true,
        },
        {
            Header: "Symptoms",
            accessor: "symptoms",
            filterable: true,
        },
        {
            Header: "Food Allergy",
            accessor: "has_food_allergy",
            filterable: true,
            Cell: (cell) => {

                return <React.Fragment>
                    {cell.value === 1 ? <span className="badge badge-soft-success text-uppercase">{'Yes'}</span>
                        : <span className="badge badge-soft-danger text-uppercase">{'No'}</span>
                    }
                </React.Fragment>;
            },

        },
        {
            Header: "Drug Allergy",
            accessor: "has_drug_allergy",
            filterable: true,
            Cell: (cell) => {

                return <React.Fragment>
                    {cell.value === 1 ? <span className="badge badge-soft-success text-uppercase">{'Yes'}</span>
                        : <span className="badge badge-soft-danger text-uppercase">{'No'}</span>
                    }
                </React.Fragment>;
            },

        },
        {
            Header: "Smoking",
            accessor: "is_smoker",
            filterable: true,
            Cell: (cell) => {

                return <React.Fragment>
                    {cell.value === 1 ? <span className="badge badge-soft-success text-uppercase">{'Yes'}</span>
                        : <span className="badge badge-soft-danger text-uppercase">{'No'}</span>
                    }
                </React.Fragment>;
            },

        },
        {
            Header: "Family History of Diabetes",
            accessor: "family_history_diabetes",
            filterable: true,
            Cell: (cell) => {

                return <React.Fragment>
                    {cell.value === 1 ? <span className="badge badge-soft-success text-uppercase">{'Yes'}</span>
                        : <span className="badge badge-soft-danger text-uppercase">{'No'}</span>
                    }
                </React.Fragment>;
            },

        },
        {
            Header: "Diagnosed with Diabetes",
            accessor: "is_diagnosed_with_diabetes",
            filterable: true,
            Cell: (cell) => {

                return <React.Fragment>
                    {cell.value === 1 ? <span className="badge badge-soft-success text-uppercase">{'Yes'}</span>
                        : <span className="badge badge-soft-danger text-uppercase">{'No'}</span>
                    }
                </React.Fragment>;
            },

        },

        {
            Header: "Actions",
            Cell: (cellProps) => {
                return (
                    <UncontrolledDropdown>
                        <DropdownToggle href="#" className="btn btn-soft-secondary btn-sm dropdown" tag="button">
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem
                                className="dropdown-item edit-item-btn"
                                href="#"
                                onClick={() => {
                                    onEditClick(cellProps.row.original);
                                    toast.warn('coming soon', { autoClose: 3000 });
                                }}

                            >
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Edit
                            </DropdownItem>
                            <DropdownItem
                                className="dropdown-item remove-item-btn"
                                href=""
                                onClick={() => {
                                    handleDeleteSymptoms(cellProps.row.original)
                                }}
                            >
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                Delete
                            </DropdownItem>
                        </DropdownMenu>

                    </UncontrolledDropdown >
                );
            },
        },

    ], []);


    return (
        <Col xxl={12}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center flex-wrap gap-2">
                        <div className="d-flex flex-grow-1 gap-1">
                            Symptoms List

                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div>
                        <TableContainer
                            columns={symptomsColumns}
                            data={symptomsList}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                            divClass="table-responsive table-card mb-3"
                            tableClass="align-middle table-nowrap"
                            theadClass="table-light"
                            SearchPlaceholder='Search for symptoms...'
                        />

                    </div>
                </CardBody>


            </Card>
        </Col>
    );
};

export default SymptomsList;