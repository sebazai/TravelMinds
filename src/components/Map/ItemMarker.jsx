"use client"
import {Marker, Popup, Tooltip, useMap} from "react-leaflet";
import {useEffect, useRef, useState} from "react";

export const ItemMarker = (props) => {
  const {item: {title, lat, lng, start_timestamp, end_timestamp, description}, icon} = props;
  const map = useMap();

  const [refReady, setRefReady] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  let markerRef = useRef();
  let popupRef = useRef();

  useEffect(() => {
    if (refReady && isOpened) {
      popupRef.openOn(map);
    }
  }, [isOpened, refReady, map]);

  useEffect(() => {
    markerRef.current.getPopup().on('remove', function() {
      setIsOpened(false);
    });
  }, [markerRef]);

  return (<Marker ref={markerRef} icon={icon} position={[lng, lat]} eventHandlers={{
    click: () => {
      setIsOpened(true);
    },
  }}>
    {!isOpened && <Tooltip opacity={1} direction="bottom" offset={[14, 40]} permanent>{title}</Tooltip> }
    <Popup

      ref={(r) => {
        popupRef = r;
        setRefReady(true);
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      working hours: <b>{start_timestamp}</b>- <b>{end_timestamp}</b>

    </Popup>
  </Marker>)
}