import React, { useEffect, useState } from 'react'

export const Usepermition = ( code) => {
    const [location, setlocation] = useState({
        loaded:false,
        crd: {
            lat:"",
            long:""
        }
    });
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "granted") {
                  console.log(result.state);
                  navigator.geolocation.watchPosition(function(position) {
                    setlocation({
                        loaded:true,
                        crd:{
                            lat:position.coords.latitude,
                            long:position.coords.longitude
                        }
                    })
                    console.log("Longitude is :", position.coords.longitude);
                    console.log("Latitude is :", position.coords.latitude);
                  
        
                  });
        
        
                } else if (result.state === "prompt") {
                  console.log(result.state);
                   navigator.geolocation.watchPosition(function(position) {
                    console.log("Latitude is :", position.coords.latitude);
                    console.log("Longitude is :", position.coords.longitude);
                    setlocation({
                        loaded:true,
                        crd:{
                            lat:position.coords.latitude,
                            long:position.coords.longitude
                        }
                    })
                  });
                } else if (result.state === "denied") {
                 alert("autorise le localisation ")
                  //If denied then you have to show instructions to enable location
                }
                result.onchange = function () {
                  console.log(result.state);
                };
              });
          } else {
            alert("Sorry Not available!");
          }
          
            
          
         

    
    }, [])

    
  return (
    location
  )
}