import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { shade, lighten } from 'polished';
import Switch from 'react-switch';

import mapMarkerImg from '../images/MapMarker.svg';
import mapMarkerDarkImg from '../images/MapMarkerDark.svg';
import mapIcon from '../utils/mapIcon';
import mapIconDark from '../utils/mapIconDark';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';

import { ThemeContext } from '../App';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const themeContext = useContext(ThemeContext);
  const [defaultLocation, setDefaultLocation] = useState({
    latitude: -23.469174,
    longitude: -47.7382358,
  });
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then((response) => {
      setOrphanages(response.data);
    });
    getLocation();
  }, []);

  function getLocation() {
    navigator.geolocation.getCurrentPosition((currentPosition: Position) => {
      setDefaultLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
    });
  }

  function handleSwitchChange(checked: boolean) {
    themeContext.changeTheme();
  }

  return (
    <div id='page-map' className={themeContext.theme === 'dark' ? 'dark' : ''}>
      <aside>
        <header>
          <div className='logoContainer'>
            <img
              src={
                themeContext.theme === 'dark' ? mapMarkerDarkImg : mapMarkerImg
              }
              alt='Happy'
            />

            <Switch
              className={
                themeContext.theme === 'light' ? 'switch sun' : 'switch moon'
              }
              onChange={handleSwitchChange}
              checked={themeContext.theme === 'light' ? false : true}
              checkedIcon={false}
              uncheckedIcon={false}
              height={10}
              width={30}
              handleDiameter={22}
              offColor={lighten(
                0.3,
                themeContext.theme === 'light' ? '#29b6d1' : '#222'
              )}
              onColor={shade(
                0.4,
                themeContext.theme === 'light' ? '#29b6d1' : '#222'
              )}
              offHandleColor={shade(
                0.4,
                themeContext.theme === 'light' ? '#29b6d1' : '#222'
              )}
              onHandleColor={lighten(
                0.2,
                themeContext.theme === 'light' ? '#29b6d1' : '#222'
              )}
            />
          </div>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Capela do Alto</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[defaultLocation.latitude, defaultLocation.longitude]}
        zoom={16}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${
            themeContext.theme === 'dark' ? 'dark' : 'light'
          }-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${
            process.env.REACT_APP_MAPBOX_TOKEN
          }`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={themeContext.theme === 'dark' ? mapIconDark : mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className='map-popup'
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color='#fff' />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
