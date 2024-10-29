'use client'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import {ItemMarker} from "@/components/Map/ItemMarker";
import L from "leaflet";
import {SelectionOverlay} from "@/components/Map/SelectionOverlay";
import {useChatMutation} from "@/store/services/chatApi";

export const Map = (props) => {
  const {position} = props;
  const icon = L.icon({iconUrl: "/images/marker-icon.png"});
  const [chat, { isLoading, isSuccess, data, error }] = useChatMutation();

  if (!position) {
    return <div>Unable to retrieve your location</div>; // Handle error state
  }
  return (
    <div>
      <SelectionOverlay chat={chat} location={position} chips={["cycling", "jogging", "military museum", 'soviet era related points of interest']}></SelectionOverlay>
      <MapContainer
        style={{ height: "calc(100vh - 99px)" }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {data && data.places.map((item) => {
          return <ItemMarker item={item} key={item.address} icon={icon} />;
        })}
        <Marker position={position} icon={icon}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
