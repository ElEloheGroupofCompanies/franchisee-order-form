import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Card, Pagination, Modal, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../utils/http';
import useLocalStorage from "../hooks/useLocalStorage";

const Home = () => {
    const { token, getItem, removeItem } = useLocalStorage();
    const api = useApi(token);
    const [purchaseOrderForms, setPurchaseOrderForms] = useState([]);
    const [user, _] = useState(JSON.parse(getItem("user") || null));
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await api.post("/logout");
            removeItem("token");
            removeItem("user");
            navigate("/login");
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPurchaseOrderForms(page);
    }, [page]);

    async function getPurchaseOrderForms(page) {
        try {
            const { data } = await api.get(`/purchaseorderforms?page=${page}`);
            const sortedData = data.data.sort((a, b) => b.id - a.id);
            setPurchaseOrderForms(sortedData);
            setTotalItems(data.total);
        } catch (error) {
            console.error("Error fetching purchase order forms:", error);
        }
    }

    const handleEditClick = (form) => {
        setEditFormData(form);
        setShowEditModal(true);
    };

    const handleModalClose = () => setShowEditModal(false);

    const handleInputChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            await api.put(`/purchaseorderform/${editFormData.id}`, editFormData);
            getPurchaseOrderForms(page); // Refresh the table
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating purchase order:", error);
        }
    };

    const handleNextPage = () => {
        if (page < Math.ceil(totalItems / itemsPerPage)) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/purchaseorderform/${id}`);
            getPurchaseOrderForms(page); // Refresh the table
        } catch (error) {
            console.error("Error deleting purchase order:", error);
        }
    };

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
    
        // Check if a file is selected
        if (!file) return;
    
        // Validate file type (e.g., only allow images)
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setEditFormData({
                ...editFormData,
                image: reader.result,
            });
        };
    };
    

    return (
        <Container>
            <Card className="mt-5" style={{ width: "100%", fontFamily: "Helvetica" }}>
                <Card.Title className="text-center" style={{ fontFamily: "Helvetica" }}>{`${user?.name}'s purchase order forms`} </Card.Title>
                <Row>
                    <Col>
                        <Button className="m-1" variant="success" as={Link} to="/createpurchaseorder">Create Purchase Order</Button>
                        <Button className="m-1" variant="danger" onClick={handleLogout}>Logout</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive className="m-1">
                            <thead className="text-center" style={{ fontSize: "14px", fontFamily: "Helvetica" }}>
                                <tr>
                                    <th>Date Purchased</th>
                                    <th>Time Purchased</th>
                                    <th>Ordered By</th>
                                    <th>Business Name</th>
                                    <th>Outlet</th>
                                    <th>Address</th>
                                    <th>FC Without Breading</th>
                                    <th>FC Quantity</th>
                                    <th>With Spicy Flavor</th>
                                    <th>Quantity</th>
                                    <th>Hot and Spicy</th>
                                    <th>Quantity</th>
                                    <th>Malunggay Flavor</th>
                                    <th>Quantity</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center" style={{ fontSize: "14px", fontFamily: "Helvetica" }}>
                                {Array.isArray(purchaseOrderForms) && purchaseOrderForms.map((form) => (
                                    <tr key={form.id}>
                                        <td>{form.date_purchased}</td>
                                        <td>{form.time_purchased}</td>
                                        <td>{form.ordered_by}</td>
                                        <td>{form.business_name}</td>
                                        <td>{form.outlet}</td>
                                        <td>{form.address}</td>
                                        <td>{form.fc_without_breading}</td>
                                        <td>{form.fc_quantity}</td>
                                        <td>{form.with_spicy_flavor}</td>
                                        <td>{form.with_spicy_flavor_quantity}</td>
                                        <td>{form.hot_and_spicy}</td>
                                        <td>{form.hot_and_spicy_quantity}</td>
                                        <td>{form.malunggay}</td>
                                        <td>{form.malunggay_quantity}</td>
                                        <td>{form.image}</td>
                                        <td>
                                            <Button
                                                className="m-1 text-center"
                                                variant="primary"
                                                style={{ fontSize: "14px", fontFamily: "Helvetica" }}
                                                onClick={() => handleEditClick(form)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                className="m-1"
                                                variant="danger"
                                                style={{ fontSize: "14px", fontFamily: "Helvetica" }}
                                                onClick={() => handleDelete(form.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Pagination className="m-1 d-flex justify-content-center">
                    <Pagination.Prev onClick={handlePrevPage} disabled={page === 1} />
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Next onClick={handleNextPage} disabled={page === Math.ceil(totalItems / itemsPerPage)} />
                </Pagination>
            </Card>
            <Modal show={showEditModal} onHide={handleModalClose} style={{ fontFamily: "Helvetica" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Purchase Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Date Purchased</Form.Label>
                            <Form.Control
                                type="date"
                                name="date_purchased"
                                value={editFormData?.date_purchased || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Time Purchased</Form.Label>
                            <Form.Control
                                type="time"
                                name="time_purchased"
                                value={editFormData?.time_purchased || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ordered By</Form.Label>
                            <Form.Control
                                type="text"
                                name="ordered_by"
                                value={editFormData?.ordered_by || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Business Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="business_name"
                                value={editFormData?.business_name || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                name="outlet"
                                value={editFormData?.outlet || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={editFormData?.address || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleUploadImage}
                                placeholder="Image"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Home;
