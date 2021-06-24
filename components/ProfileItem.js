import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Form, Modal } from "react-bootstrap";
import { server } from "../config";

export default function ProfileItem({ customerData, adminsData, session }) {
  const { _id, status } = customerData;
  const { name, phone, email, rentname, comments } = customerData.customer;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* delete customer order ========================*/
  const deleteAccount = async () => {
    try {
      const res = await axios.delete(
        `${process.env.BASE_URL}/deleteCustomer?id=${_id}`
      );

      if (res.status === 200) {
        setShow(false);
        alert("Order Deleted Successfully"); //toast will be added here
        window.location.href = "/";
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  /* update customer order status(pending, done, ongoing)================================= */
  const handleStatus = async (e) => {
    try {
      await fetch(`${process.env.BASE_URL}/statusUpdate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: _id,
          status: e.target.value,
        }),
      });
      alert("status updated successfully");
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      {session?.user.email === email ? (
        <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{rentname}</td>
          <td>{comments}</td>
          <td>{customerData.status}</td>

          <td>
            <button onClick={handleShow}>Delete</button>
          </td>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <button variant="secondary" onClick={handleClose}>
                No
              </button>
              <button variant="primary" onClick={deleteAccount}>
                Ok
              </button>
            </Modal.Footer>
          </Modal>
        </tr>
      ) : (
        adminsData?.map(
          (adminData) =>
            adminData.email === session?.user.email && (
              <tr key={_id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{rentname}</td>
                <td>{comments}</td>

                <td>
                  {status == "Pending" && (
                    <Form.Control
                      as="select"
                      className="text-danger"
                      onChange={handleStatus}
                    >
                      <option selected style={{ color: "#FF4545" }}>
                        Pending
                      </option>
                      <option style={{ color: "#009444" }}>Done</option>
                      <option style={{ color: "#FFBD3E" }}>Ongoing</option>
                    </Form.Control>
                  )}
                  {status == "Done" && (
                    <Form.Control
                      as="select"
                      className="text-success"
                      onChange={handleStatus}
                    >
                      <option style={{ color: "#FF4545" }}>Pending</option>
                      <option selected style={{ color: "#009444" }}>
                        Done
                      </option>
                      <option style={{ color: "#FFBD3E" }}>Ongoing</option>
                    </Form.Control>
                  )}
                  {status == "Ongoing" && (
                    <Form.Control
                      as="select"
                      className="text-warning"
                      onChange={handleStatus}
                    >
                      <option style={{ color: "#FF4545" }}>Pending</option>
                      <option style={{ color: "#009444" }}>Done</option>
                      <option selected style={{ color: "#FFBD3E" }}>
                        Ongoing
                      </option>
                    </Form.Control>
                  )}
                </td>
                <td>
                  <button onClick={handleShow}>Delete</button>
                </td>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                  </Modal.Header>

                  <Modal.Footer>
                    <button
                      variant="secondary"
                      onClick={handleClose}
                      style={{ color: "#000" }}
                    >
                      No
                    </button>
                    <button
                      variant="primary"
                      onClick={deleteAccount}
                      style={{ color: "#000" }}
                    >
                      Ok
                    </button>
                  </Modal.Footer>
                </Modal>
              </tr>
            )
        )
      )}
    </>
  );
}
