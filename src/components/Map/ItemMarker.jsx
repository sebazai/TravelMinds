'use client';
import { Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Rating,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Style global pour personnaliser les popups Leaflet
const leafletPopupStyle = `
  .custom-popup.leaflet-popup {
    margin-bottom: 20px;
  }
  
  .custom-popup .leaflet-popup-content-wrapper {
    background: transparent !important;
    box-shadow: none !important;
    padding: 0 !important;
    border-radius: 8px !important;
    min-width: calc(100vw - 15px) !important;
  }
  
  .custom-popup .leaflet-popup-content {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .custom-popup .leaflet-popup-tip-container {
    display: none !important;
  }

  .custom-leaflet-tooltip {
  background-color: rgba(0, 0, 0, 0) !important;
  color: white !important;
  font-weight: bold !important;
  border: none !important;
  box-shadow: none !important;

`;

export const ItemMarker = (props) => {
  const {
    item: {
      name = '',
      address,
      coordinates,
      opens_at = '00:00',
      closes_at = '00:00',
      description = ' ',
      photo,
      rating,
    },
    icon,
    onFavoriteClick,
  } = props;

  const { latitude: lat, longitude: lng } = coordinates;
  const map = useMap();
  const [refReady, setRefReady] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  let markerRef = useRef();
  let popupRef = useRef();

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = leafletPopupStyle;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  useEffect(() => {
    if (refReady && isOpened) {
      popupRef.openOn(map);
    }
  }, [isOpened, refReady, map]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.getPopup().on('remove', function () {
        setIsOpened(false);
      });
    }
  }, [markerRef]);

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      setIsFavorite(true);
      onFavoriteClick(props.item);
    } else {
      setIsFavorite(false);
      //todo : call the API to remove the favorite
    }
  };

  return (
    <Marker
      ref={markerRef}
      icon={icon}
      position={[lat, lng]}
      eventHandlers={{
        click: () => {
          setIsOpened(true);
        },
      }}
    >
      {!isOpened && (
        <Tooltip
          opacity={1}
          direction="right"
          offset={[14, 40]}
          permanent
          className="custom-leaflet-tooltip"
        >
          {name}
        </Tooltip>
      )}
      <Popup
        ref={(r) => {
          popupRef = r;
          setRefReady(true);
        }}
        className="custom-popup"
      >
        <Card
          sx={{
            display: 'flex',
            width: '100%',
            minWidth: 'calc(100vw - 15px)',
            height: 250,
            position: 'relative',
            margin: 0,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              color: isFavorite ? 'text.secondary' : 'grey',
            }}
            onClick={handleFavoriteClick}
          >
            <FavoriteIcon />
          </IconButton>

          <CardMedia
            component="img"
            sx={{
              width: '40%',
              objectFit: 'cover',
              height: '100%',
              backgroundImage: `url(${photo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <CardContent
            sx={{
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 2,
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  lineHeight: 1.2,
                }}
              >
                {name}
              </Typography>
            </Grid>

            <Grid container sx={{ marginY: 1 }}>
              <Rating
                name="place-rating"
                value={Number(rating)}
                precision={0.1}
                size="medium"
                readOnly
                sx={{ color: 'orange.main' }}
              />
            </Grid>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginBottom: 1 }}
            >
              {address}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginBottom: 1 }}
            >
              {description}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginBottom: 1 }}
            >
              Schedules : {opens_at} - {closes_at}
            </Typography>
          </CardContent>
        </Card>
      </Popup>
    </Marker>
  );
};
