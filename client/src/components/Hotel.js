import React from "react";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
export const Hotels = () => {
  const [data, setData] = useState(null);
  const [activeData, setActiveData] = useState(data);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [rooms, setRooms] = useState("");
  const [hotel, setHotel] = useState();

  function openModal(hotel) {
    setHotel(hotel);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    (async () => {

      let url = "/hotels";
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

  const booking = () => {
    closeModal();

    const d = new Date();
    let date = d.toString();

    const data = {
      id: date,
      hotelId: hotel.id,
      touristId: "123",
      arrival: arrival,
      departure: departure,
      rooms: rooms
    }
    let url = "/bookings";
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    setArrival('');
    setDeparture('');
    setRooms('');
  }

  const ShowData = (props) => {
    if (props.data) {
      return (
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            appElement={document.getElementById('root') || undefined}
          >
            <h3>Book Hotel</h3>
            <Form>
              <Form.Group className="mb-3" controlId="arrival">
                <Form.Label>Arrival Date</Form.Label>
                <Form.Control value={arrival} onChange={(e)=>setArrival(e.target.value)} type="text" placeholder="DD/MM/YYYY" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="departure">
                <Form.Label>Departure Date</Form.Label>
                <Form.Control value={departure} onChange={(e)=>setDeparture(e.target.value)} type="text" placeholder="DD/MM/YYYY" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="rooms">
              <Form.Label>Number of Rooms</Form.Label>
                <Form.Control value={rooms} onChange={(e)=>setRooms(e.target.value)} type="text" placeholder="Rooms" />
              </Form.Group>
              <Button variant="primary" onClick={booking}>
                Submit
              </Button>
            </Form>
          </Modal>
          <table className="table table-striped">
            <thead>
              <tr >
                <th>Name</th>
                <th>Rooms Remaining</th>
              </tr>
            </thead>
            <tbody>{props.data.map((val, key) => {
                return (
                  <tr key={key} onClick={() => openModal(val)}>
                    <td>
                      <p>{val.name}</p>
                    </td>
                    <td>
                      <p>{val.roomsCount}</p>
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
      <h3>Hotels</h3>
      <ShowData data={activeData} />
    </div>
  );
};
