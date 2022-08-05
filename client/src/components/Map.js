import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

export const Map = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const hotels = await fetch("/hotels-on-map")
        .then((res) => res.json())
        .then((data) => setData(data));
      console.debug(data, hotels);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);

  const ShowData = (props) => {
    if (props.data) {
      // populate the markers array with location data
      let markers = [];
      for (let i = 0; i < props.data.length; i++) {
        markers.push(
          <Marker
            position={[
              props.data[i].location.lat,
              props.data[i].location.lon,
            ]}
          >
            {/* Tool tip for on hover popup */}
            <Tooltip>
              <div className="card" style={{ width: "16rem" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-8">
                      <h5 className="card-title"><b>Hotel Name </b>: {props.data[i].name}</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <h6 className="card-subtitle mb-2 text-muted">
                        <b>Rooms Available</b> : {props.data[i].roomsCount}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Tooltip>
          </Marker>
        );
      }
      return (
        <MarkerClusterGroup className="cluster">{markers}</MarkerClusterGroup>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <div className="container my-2">
        <div id="map">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="markercluster-map"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ShowData data={data} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};
