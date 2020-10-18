import Leaflet from 'leaflet';

import mapMarkerDarkImg from '../images/MapMarkerDark.svg';

const mapIconDark = Leaflet.icon({
  iconUrl: mapMarkerDarkImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

export default mapIconDark;