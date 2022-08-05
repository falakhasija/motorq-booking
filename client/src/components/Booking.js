import React from "react";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

// component to display the vehicle table
export const Bookings = () => {
  const [data, setData] = useState(null);
  const [activeData, setActiveData] = useState(data);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [key, setKey] = useState();
  const [bookingId, setBookingId] = useState("");

  function openModal(key, val) {
    setIsOpen(true);
    setBookingId(val.id);
    setKey(key);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function deleteBooking() {
    setData(data.filter((v, i) => i !== key));

    fetch('/bookings/' + bookingId, {
        method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))

    closeModal()
  }

  useEffect(() => {
    (async () => {

      let url = "/bookings";
      const hotels = await fetch(url)
        .then((res) => res.json())
        .then((result) => setData(result));
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setActiveData(data);
    }
  }, [data]);

  const ShowData = () => {
    if (data) {
      return (
        <div>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            appElement={document.getElementById('root') || undefined}
            >
                <h3>Cancel Booking</h3>
                <br/>
                <Button variant="primary" onClick={deleteBooking}>
                    Submit
                </Button>
            </Modal>
          <table className="table table-striped">
            <thead>
              <tr >
                <th>Hotel</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Rooms</th>
              </tr>
            </thead>
            <tbody>{data.map((val, key) => {
                return (
                  <tr key={key} onClick={() => openModal(key, val)}>
                    <td>
                      <p>{val.hotelId}</p>
                    </td>
                    <td>
                      <p>{val.arrival}</p>
                    </td>
                    <td>
                      <p>{val.departure}</p>
                    </td>
                    <td>
                      <p>{val.rooms}</p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  return (
    <div className="my-2">
      <h3>Bookings</h3>
      <ShowData data={activeData} />
    </div>
  );
};
