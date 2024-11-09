'use client';
import {Marker, Popup, Tooltip, useMap} from 'react-leaflet';
import {useEffect, useRef, useState} from 'react';

export const ItemMarker = (props) => {
  const {item: {name = '', address, coordinates, start_timestamp = '00:00', end_timestamp = '00:00', description= ''}, icon} = props;
  const {latitude: lat, longitude: lng, } = coordinates;
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

  return (<Marker ref={markerRef} icon={icon} position={[lat, lng]} eventHandlers={{
    click: () => {
      setIsOpened(true);
    },
  }}>
    {!isOpened && <Tooltip opacity={1} direction="bottom" offset={[14, 40]} permanent>{name}</Tooltip> }
    <Popup

      ref={(r) => {
        popupRef = r;
        setRefReady(true);
      }}
    >
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{address}</p>
      working hours: <b>{start_timestamp}</b>- <b>{end_timestamp}</b>

    </Popup>
  </Marker>);
};