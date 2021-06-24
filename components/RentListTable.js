import React, { useState } from "react";
import axios from "axios";
import rentListTableStyles from "../styles/RentListTable.module.scss";
import { Modal } from "react-bootstrap";
import { server } from "../config";

const RentListTable = ({ rentsData, adminsData, session }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* delete apartment data ========================*/
  const deleteApartment = async (id) => {
    try {
      const res = await axios.delete(
        `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/apartment-hunt-ogagn/service/apartment-service/incoming_webhook/deleteApartment?id=${id}`
      );

      if (res.status === 200) {
        alert("Apartment Deleted Successfully"); //toast will be added here
        window.location.reload();
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  /* find the admins email to conditionally style and render the apartement data table ====================== */
  const adminsEmail = adminsData?.find((ad) => ad.email);

  return (
    <div
      className={rentListTableStyles.rentListTable}
      style={{
        display: adminsEmail?.email === session?.user.email ? "block" : "none",
      }}
    >
      <h1>Apartments</h1>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th className="text-secondary" scope="col">
              Name
            </th>
            <th className="text-secondary" scope="col">
              Location
            </th>
            <th className="text-secondary" scope="col">
              Bedroom
            </th>
            <th className="text-secondary" scope="col">
              Bathroom
            </th>
            <th className="text-secondary" scope="col">
              Price
            </th>
            <th className="text-secondary" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rentsData?.map(
            (rentData) =>
              adminsEmail.email === session?.user.email && (
                <tr key={rentData._id}>
                  <td>{rentData.name}</td>
                  <td>{rentData.location}</td>
                  <td>{rentData.bedroom}</td>
                  <td>{rentData.bathroom}</td>
                  <td>{rentData.price}</td>

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
                      <button
                        variant="primary"
                        onClick={() => deleteApartment(rentData._id)}
                      >
                        Ok
                      </button>
                    </Modal.Footer>
                  </Modal>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RentListTable;
