import { MapContainer, TileLayer, Marker,useMap} from "react-leaflet";
import { useState, useEffect } from "react";
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
  const [invalide, setInvalide] = useState(false)  

  

  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
    iconSize: [20, 40],
    iconAnchor: [18, 18],
    popupAnchor: [0, -10],
    shadowAnchor: [10, 10]
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const myfun = async () => {
    await axios.get(`http://localhost:5000/api/localisation/?q=${code}`)
    .then(response => {
        const res = response.data;
        console.log('les data',res)
        if(res===null){
          setInvalide (true);
        }else{
          setLat(res.crd.lat);
          setLon(res.crd.long);
          setLoaded(res.loaded);
        }
        
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
    },[ myfun ]);

 function LocationMarker() {
      const map = useMap();
  
      useEffect(() => {
          console.log('votre latitiude')
          map.flyTo([lat,lon], 18, {
            duration: 2
          });
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  
      return loaded === false && invalide === true ? null: (
        <Marker position={[lat,lon]} icon={defaultIcon} >
         
        </Marker>
      );
    }


  

  return (
    <div className="  container-fluid dark:bg-[#212533] h-[100vh]  " >
    
    <div className='ml-[40%] md:ml-0 md:mr-0  md:mt-14' >
      
    { invalide === true? //( toast.warning("votre code invalide ", toastOptions) 
    (<div>votre code inavalide </div>
    ):(<MapContainer style={{ height: "calc(100vh - 65px)" }}  center={[lat, lon]} zoom={15}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   <LocationMarker/>
  </MapContainer>) }
    
    </div>
    
    </div>
  );
};

export default Suivi;
