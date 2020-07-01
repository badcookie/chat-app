import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

import routes from '../../routes';
import { actions as allActions } from '../../slices';

const { setHasNetworkError } = allActions.network;
const { hideModal, setModalInfo } = allActions.modalInfo;
const actions = { hideModal, setModalInfo, setHasNetworkError };

const mapStateToProps = (state) => {
    const { modalInfo, networkError } = state;
    return { modalInfo, networkError };
};

const onSubmit = (props) => async (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    const url = routes.channelsPath();
    const data = { attributes: { name: values.body } };

    try {
        await axios.post(url, { data });
    } catch (error) {
        props.setHasNetworkError(true);
        return;
    }

    resetForm();
    if (props.networkError) {
        props.setHasNetworkError(false);
    }

    props.hideModal();
};

const AddChannel = (props) => {
    const formik = useFormik({
        onSubmit: onSubmit(props),
        initialValues: { body: '' },
    });

    return (
        <Modal show={props.modalInfo.type === 'add'} onHide={props.hideModal}>
            <Modal.Header closeButton onHide={props.hideModal}>
                <Modal.Title>Add</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <FormControl
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.body}
                            data-testid="input-body"
                            name="body"
                        />
                        <div className="d-block invalid-feedback">
                            {props.networkError && 'Network error'}
                            &nbsp;
                        </div>
                    </FormGroup>
                    <input type="submit" className="btn btn-primary" value="submit" />
                </form>
            </Modal.Body>
        </Modal>
    );
};

AddChannel.propTypes = {
    hideModal: PropTypes.func,
    setModalInfo: PropTypes.func,
    networkError: PropTypes.bool,
    modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actions)(AddChannel);