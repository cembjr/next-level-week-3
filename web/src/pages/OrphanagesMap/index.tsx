import React from "react";
import "./index.css";
import mapMarking from "../../images/map-marker.svg";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map, TileLayer } from "react-leaflet";

import 'leaflet/dist/leaflet.css';

export const OrphanagesMapPage: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarking} alt="Happy" />
          <h2>Esolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Taquarivaí</strong>
          <p>São Paulo</p>
        </footer>
      </aside>
      <Map
        center={[-23.5131381, -46.8931377]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>

      <Link to="/" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};
