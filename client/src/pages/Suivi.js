import { MapContainer, TileLayer, Marker} from "react-leaflet";
import { useState, useEffect, useCallback } from "react";
import L from "leaflet";
import axios from 'axios'
import {useLocation} from 'react-router-dom';

const Suivi = () => {
  const location = useLocation();
  const code=location.state.code;
  console.log('votre code est ',code)
  const [lat, setLat] = useState(30.55);
  const [lon, setLon] = useState(9.66);
  const[loaded,setLoaded] = useState(false); 
  

  

  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
    iconSize: [20, 40],
    iconAnchor: [18, 18],
    popupAnchor: [0, -10],
    shadowAnchor: [10, 10]
  });

  const myfun =async () => {
 await axios.get(`/api/localisation/?q=${code}`)
    .then(response => {
        const res = response.data;
        console.log('les data',res)
        setLat(res.crd.lat);
        
        setLon(res.crd.long);
        setLoaded(res.loaded);
        
    })
    .catch(err => {
            console.log("Error getting last position: ", err);
        });
  };
  
    useEffect(() => {
      const interval = setInterval(() => {
        myfun();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    },[myfun ]);
  
  console.log('le code est',code)

  return (
    <div className="  container-fluid dark:bg-[#212533] h-[100vh]  " >
    
    <div className='ml-[40%] md:ml-0 md:mr-0  md:mt-10' >
      
          
    <MapContainer style={{ height: "calc(100vh - 52px)" }}  center={[36.8197, 10.1761]} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { loaded && 
      <Marker
        position={[lat, lon]}
        icon={defaultIcon}
        
      >
        
      </Marker>}
    </MapContainer>
    </div>
    </div>
  );
};

export default Suivi;
