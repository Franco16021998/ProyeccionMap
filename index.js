
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { debounce } from "ts-debounce";
import data from "./data.json";

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -12.0464, lng: -77.0428 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 50,
      center: uluru,
    });

    const locations = [
        { lat: -31.56391, lng: 147.154312 },
        { lat: -33.718234, lng: 150.363181 },
        { lat: -33.727111, lng: 150.371124 },
        { lat: -33.848588, lng: 151.209834 },
        { lat: -33.851702, lng: 151.216968 },
        { lat: -34.671264, lng: 150.863657 },
        { lat: -35.304724, lng: 148.662905 },
        { lat: -36.817685, lng: 175.699196 },
        { lat: -36.828611, lng: 175.790222 },
        { lat: -37.75, lng: 145.116667 },
        { lat: -37.759859, lng: 145.128708 },
        { lat: -37.765015, lng: 145.133858 },
        { lat: -37.770104, lng: 145.143299 },
        { lat: -37.7737, lng: 145.145187 },
        { lat: -37.774785, lng: 145.137978 },
        { lat: -37.819616, lng: 144.968119 },
        { lat: -38.330766, lng: 144.695692 },
        { lat: -39.927193, lng: 175.053218 },
        { lat: -41.330162, lng: 174.865694 },
        { lat: -42.734358, lng: 147.439506 },
        { lat: -42.734358, lng: 147.501315 },
        { lat: -42.735258, lng: 147.438 },
        { lat: -43.999792, lng: 170.463352 },
      ];

    const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
    });
    // The marker, positioned at Uluru
    const markers = data.map((location) => {
        const marker = new google.maps.Marker({
            position: { lat: Number(location.lat), lng: Number(location.lng) },            
                
        });
        marker.addListener("click", () => {
            infoWindow.setContent(`<div>${location.lat}, ${location.lng}</div>`);
            infoWindow.open(map, marker);
        }
        );
        return marker;
    });

    

    google.maps.event.addListener(map,'idle', debounce(() => {
  
        let boundsActualizados = map.getBounds();
        
        let markersLoad = []
        
        const markersVisible = markers.forEach(marker => {
          let visible = boundsActualizados?.contains(marker.getPosition());

          if (visible) {
                 markersLoad.push(marker)
            }
          
        });

        
        new MarkerClusterer( 
            map,
            markersLoad,
            {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                gridSize: 40,               
                minimumClusterSize: 20,
               
            }
        );
    }, 500));

           

        

      
    
   
      
    

     

    
  }
  
  window.initMap = initMap;