
import {GMap} from 'primereact/gmap';
import React from 'react';

const maps = () => {
    const options = {
        center: {lat: 36.890257, lng: 30.707417},
        zoom: 12
    };

    return ( 
        <GMap options={options} style={{width: '100%', minHeight: '320px'}} />
     );
}
 
export default maps;