import { Modal, Button } from "react-bootstrap";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEventApi, closeEvent } from "../../Redux/actions";

const Popping = ({
    open,
    handleClose,
    event,
    deleteEventApi,
    renderStatus,
    rerender,
    mode,
}) => {
    const { id, describe, title, start, end } = event;

    const handleDelete = async () => {
        await deleteEventApi(event.id);
        rerender(!renderStatus);
        window.alert("Event deleted successfully!");
    };

    const navigate = useNavigate();

    const handleUpdate = async () => {
       navigate(`/event/${id}/update`);
    };

    const modal = () => {
        return (
            <Modal show={open} onHide={handleClose}>
                <Modal.Header
                    closeButton
                    closeVariant={mode === "light" ? "black" : "white"}
                    style={{
                        backgroundColor: mode === "light" ? "" : "#36393e",
                    }}
                    className={`border border-${
                        mode === "light" ? "" : "secondary"
                    }`}
                >
                    <Modal.Title
                        className={`text-capitalize text-${
                            mode === "light" ? "black" : "white"
                        }`}
                    >
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        backgroundColor: mode === "light" ? "" : "#36393e",
                    }}
                    className={`border border-${
                        mode === "light" ? "" : "secondary"
                    }`}
                >
                    {describe ? (
                        <p
                            className={`lead text-${
                                mode === "light" ? "black" : "white"
                            }`}
                        >
                            {describe}
                        </p>
                    ) : (
                        <p
                            className={`lead text-${
                                mode === "light" ? "black" : "white"
                            }`}
                        >
                            No Description Yet
                        </p>
                    )}
                    <div
                        className={`row justify-content-between text-${
                            mode === "light" ? "black" : "white"
                        }`}
                    >
                        <p className="col small text-center pb-0 mb-0">
                            from: {start}
                        </p>
                        <p className="col small text-center pb-0 mb-0">
                            to: {end}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer
                    style={{
                        backgroundColor: mode === "light" ? "" : "#36393e",
                    }}
                    className={`justify-content-center border border-${
                        mode === "light" ? "" : "secondary"
                    }`}
                >
                    <Button variant="warning" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleUpdate}>Update</Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    if (id) {
        return modal();
    } else {
        <p>there is no modal to preview</p>;
    }
};

function mapStateToProps({ event }) {
    return {
        event,
        //  modalStatus
    };
}

export default connect(mapStateToProps, { deleteEventApi, closeEvent })(
    Popping
);
