import React, { useEffect, useState } from 'react';
import {
    Col,
    Row,
    Input,
    Button,
} from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getWalletTransactionList } from '../../store/actions';

const TransactionFilter = ({ onTrnassactionFilter }) => {
    const dispatch = useDispatch();

    const { AllWalletTransactionList } = useSelector((state) => ({
        AllWalletTransactionList: state.Wallet.AllWalletTransactionList
    }));

    useEffect(() => {
        dispatch(getWalletTransactionList());
    }, [dispatch]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endDateError, setEndDateError] = useState(null); // State for end date error message

    const handlechangeSearch = (value) => {

        const data = AllWalletTransactionList?.filter((item) => {
            const siteName = item?.user?.email?.toLowerCase() || '';
            const searchFields = [siteName];
            return searchFields.some((field) => field.includes(value.toLowerCase()));
        });
        onTrnassactionFilter(data);
    };

    const handlechangeCategory = (value) => {
        const result = AllWalletTransactionList?.filter(item => item?.type === value);
        onTrnassactionFilter(result);
    };

    const handleStartDateChange = (startDate) => {
        setStartDate(startDate);
        handleDateFilter(startDate, endDate); // Call handleDateFilter with both start and end dates
    };

    const handleEndDateChange = (endDate) => {
        const currentDate = new Date();
        if (endDate > currentDate) {
            // End date cannot be in the future, so set it to the current date
            setEndDate(currentDate);
            setEndDateError('End date cannot be in the future'); // Set error message
            handleDateFilter(startDate, currentDate); // Call handleDateFilter with updated end date
        } else {
            setEndDate(endDate);
            setEndDateError(null); // Clear error message
            handleDateFilter(startDate, endDate); // Call handleDateFilter with selected end date
        }
    };

    const handleDateFilter = (startDate, endDate) => {
        if (startDate && endDate) {
            const filteredData = AllWalletTransactionList?.filter(item => {
                const createdAtDate = new Date(item.createdAt);
                return createdAtDate >= startDate && createdAtDate <= endDate;
            });
            onTrnassactionFilter(filteredData);
        }
    };

    return (
        <React.Fragment>
            <Col xl={12}>
                <Row className="g-3">
                    <Col sm={2} style={{ display: "flex" }}>
                        <div className="search-box me-2 mb-2 d-flex col-12">
                            <label style={{ margin: "0 18px 0 0", display: "flex", alignItems: "center" }}>From</label>
                            <input
                                type="date"
                                className="form-control search"
                                onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                            />
                        </div>
                    </Col>
                    <Col sm={2}>
                        <div className="search-box me-2 mb-2 d-flex col-12">
                            <label style={{ margin: "0 18px 0 0", display: "flex", alignItems: "center" }}>To</label>
                            <input
                                type="date"
                                className="form-control search"
                                onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                            />
                            {endDateError && <p className="text-danger fw-medium fs-13 mt-1">{endDateError}</p>}
                        </div>
                    </Col>
                    <Col sm={3}>
                        <Input
                            onChange={(e) => handlechangeCategory(e.target.value)}
                            type='select'
                            className="form-select"
                            name="transactionType"
                            id="transactionType"
                        >
                            <option value="">Select Transaction Type</option>
                            <option value="deposit">Deposit</option>
                            <option value="withdrawal">Withdrawal</option>
                            <option value="entry_fee_payment">Entry Fee Payment</option>
                            <option value="prize_payout">Prize Payout</option>
                        </Input>
                    </Col>
                    <Col sm={4}>
                        <div className="search-box me-2 mb-2 d-inline-block col-12">
                            <input
                                onChange={(e) => handlechangeSearch(e.target.value)}
                                type="email"
                                className="form-control search"
                                placeholder='Search by Email'
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                        </div>
                    </Col>
                    <Col sm={1}>
                        <button type="submit" className="btn btn-success" id="add-btn" ><i className="bx bx-search-alt search-icon"></i> Search </button>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    );
};

export {
    TransactionFilter
};
