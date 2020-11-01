import React,{useState,} from 'react';
import axios from 'axios';


const Upload = (props) => {
const [images,setImages] = useState([])

const  onImageChange = event => {
        console.log(event.target.files);
    
        setImages({
          images: event.target.files,
        });
      };


   const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        Array.from(images.images).forEach(image => {
          formData.append('files', image);
          formData.append('ref','annonce')
          formData.append('refId',props.idannonce)
          formData.append('field','photos')
       
        });

        axios
          .post(process.env.REACT_APP_URL_HOST+`/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data','Authorization': 'Bearer '+localStorage.getItem('token') },
          })
          .then(res => {
            console.log(res);
            props.visible(false)
          })
          .catch(err => {
            console.log(err);
          });
    }

    return (   <form onSubmit={onSubmit}>
        <input
          type="file"
          name="files"
          onChange={onImageChange}
          alt="image"
        />
          <input type="hidden" name="ref" value="annonce" />
          <input type="hidden" name="refId" value={props.idannonce} />
          <input type="hidden" name="field" value="photos" />
          <input type="hidden" name="source" value="upload" />
        <br />
        <button type="submit">Upload</button>
      </form> );
}
 
export default Upload;