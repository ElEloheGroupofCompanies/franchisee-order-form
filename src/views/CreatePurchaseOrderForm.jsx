import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import useApi from "../utils/http";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useRef } from "react";
import { FormControl } from "react-bootstrap";

function CreatePurchaseOrderForm() {
    const { token, getItem, removeItem } = useLocalStorage();
    const setItem = useLocalStorage();
    const api = useApi(token);
    const navigate = useNavigate();
    const [user, _] = useState(JSON.parse(getItem("user") || null));
    const [date_purchased, setDatePurchased] = useState("");
    const [time_purchased, setTimePurchased] = useState("");
    const [ordered_by, setOrderedBy] = useState("");
    const [business_name, setBusinessName] = useState("");
    const [outlet, setOutlet] = useState("");
    const [address, setAddress] = useState("");
    const [fc_without_breading, setFcWithoutBreading] = useState("Class C (Small)");
    const [fc_quantity, setFcQuantity] = useState("");
    const [with_spicy_flavor, setWithSpicyFlavor] = useState("Class C (Small)");
    const [with_spicy_flavor_quantity, setWithSpicyFlavorQuantity] = useState("");
    const [hot_and_spicy, setHotAndSpicy] = useState("Class C (Small)");
    const [hot_and_spicy_quantity, setHotAndSpicyQuantity] = useState("");
    const [malunggay, setMalunggay] = useState("Class C (Small)");
    const [malunggay_quantity, setMalunggayQuantity] = useState("");
    const [image, setImage] = useState("");

    async function handleCreatePurchaseOrderForm(e) {
        e.preventDefault();
        try {
            const body = {
                date_purchased,
                time_purchased,
                ordered_by,
                business_name,
                outlet,
                address,
                fc_without_breading,
                fc_quantity,
                with_spicy_flavor,
                with_spicy_flavor_quantity,
                hot_and_spicy,
                hot_and_spicy_quantity,
                malunggay,
                malunggay_quantity,
                image,
            };

            const { data } = await api.post("/purchaseorderform", body);
            toast.success(data.message);
            navigate("/");
            navigate(0);
        } catch (e) {
            if (e.response && e.response.data) {
                toast.error(e.response.data.message);
            } else {
                toast.error("An error occurred during registration.");
            }
        }
    }

    function handleUploadImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    }

    return (
        <>
            <Container fluid>
                <Card
                    className="mx-auto mt-5 mb-5"
                    style={{ maxWidth: "600px", width: "100%", fontFamily: "Helvetica" }}
                >
                    <Card.Body>
                        <Card.Title>
                            <h3 className="text-center">Create Purchase Order Form</h3>
                        </Card.Title>
                        <Form onSubmit={handleCreatePurchaseOrderForm}>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Date Purchased</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date_purchased}
                                    onChange={(e) => setDatePurchased(e.target.value)}
                                    placeholder="Date Purchased"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Time Purchased</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={time_purchased}
                                    onChange={(e) => setTimePurchased(e.target.value)}
                                    placeholder="Time Purchased"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Ordered By</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={ordered_by || user?.name}
                                    onChange={(e) => setOrderedBy(e.target.value)}
                                    placeholder="Ordered By"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Business Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={business_name || user?.business_name}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="Business Name"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Outlet</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={outlet || user?.outlet}
                                    onChange={(e) => setOutlet(e.target.value)}
                                    placeholder="Outlet"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={address || user?.address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                />
                            </Form.Group>

                            {/* FC Without Breading Dropdown */}
                            <Dropdown onSelect={(value) => setFcWithoutBreading(value)} data-bs-theme="dark">
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="mb-3"
                                    variant="secondary"
                                >
                                    FC Without Breading
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Class A (Large)">
                                        Class A (Large)
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Class B (Medium)">
                                        Class B (Medium)
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Class C (Small)">
                                        Class C (Small)
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>FC Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fc_quantity}
                                    onChange={(e) => setFcQuantity(e.target.value)}
                                    placeholder="FC Quantity"
                                />
                            </Form.Group>

                            {/* With Spicy Flavor Dropdown */}
                            <Dropdown onSelect={(value) => setWithSpicyFlavor(value)} data-bs-theme="dark" >
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="mb-3"
                                    variant="secondary"
                                >
                                    With Spicy Flavor
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Class A (Large)">
                                        Class A (Large)
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Class B (Medium)">
                                        Class B (Medium)
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Class C (Small)">
                                        Class C (Small)
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>With Spicy Flavor Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={with_spicy_flavor_quantity}
                                    onChange={(e) => setWithSpicyFlavorQuantity(e.target.value)}
                                    placeholder="With Spicy Flavor Quantity"
                                />
                            </Form.Group>

                            {/* Hot and Spicy Dropdown */}
                            <Dropdown onSelect={(value) => setHotAndSpicy(value)}>
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="mb-3"
                                    variant="secondary"
                                >
                                    Hot and Spicy
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Class A (Large)">
                                        Class A (Large)
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Class B (Medium)">
                                        Class B (Medium)
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Class C (Small)">
                                        Class C (Small)
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Hot and Spicy Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={hot_and_spicy_quantity}
                                    onChange={(e) => setHotAndSpicyQuantity(e.target.value)}
                                    placeholder="Hot and Spicy Quantity"
                                />
                            </Form.Group>

                            {/* Malunggay Flavor Dropdown */}
                            <Dropdown onSelect={(value) => setMalunggay(value)} data-bs-theme="dark">
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="mb-3"
                                    variant="secondary"
                                >
                                    Malunggay Flavor
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Class A (Large)">
                                        Class A (Large)
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Class B (Medium)">
                                        Class B (Medium)
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Class C (Small)">
                                        Class C (Small)
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Malunggay Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={malunggay_quantity}
                                    onChange={(e) => setMalunggayQuantity(e.target.value)}
                                    placeholder="Malunggay Quantity"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleUploadImage}
                                    placeholder="Image"
                                />
                            </Form.Group>
                            <Button variant="info" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default CreatePurchaseOrderForm;
