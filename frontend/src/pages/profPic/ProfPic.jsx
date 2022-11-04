// ProfPic - create profPic.scss as well
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./profPic.scss";
import axios from 'axios';
import { AuthContext } from "../../authContext/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react";
import React from "react";




const ProfPic = () => {

    const { user } = useContext(AuthContext); // get user from auth context
    const isFirstRenderRatings = useRef(true); // don't do anything on first renders
    useEffect(() => {
        if (isFirstRenderRatings.current) {
            if (user.username != null) {
                getCall();
            }
        }
        isFirstRenderRatings.current = false;
    }, []);
    const getCall = async () => {

        try {
            const response = await axios.get(`/image/${user.username}`);
            const obj = response.data;
            setData(obj);
            console.log(obj);

        } catch (error) { console.log(error); }

    } 

    const deleteCall = async () => {
        try {
            const response = await axios.delete(`/image/${user.username}`);

        } catch (error) { console.log(error); }

    }

  const [data, setData] = React.useState([]);//update data with current data
  const [fileObject, setFileObj] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async(event) => { //handle the post request
    event.preventDefault()
    const formData = new FormData();
    formData.append("image", fileObject);
    try {
      const response = await axios({
        method: "post",
        url: `/image/${user.username}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const getResponse = getCall();
      setData(getResponse.data);
      
      console.log("it works");
    } catch(error) {
      console.log(error)
    }
  }
  const handleFileSelect = (event) => { //update the selected file
    //console.log(data);
    //setData(event.target.files[0]) //set data to the obj that we got

    //we need to set data to the actual obj
    //before the problem was that we were setData ing to a File Object
    setFileObj(event.target.files[0]);
    console.log(event.target.files[0]);
  }
  const handleSubmitClick = (event) => {
      setSubmitted(true);
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" onChange={handleSubmitClick} />

        {
           data && (

                <>
                <div>
                {data.map((singleData) => {
                    const base64String = btoa(new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
                        return data + String.fromCharCode(byte);
                    }, ''));
                    return <img src={`data:image/png;base64,${base64String}`} width="300"/>
                  })}

                </div>
                </>
            )
        }
    </form>
    <form onSubmit={()=> deleteCall()}>
                       
    <input type="submit" value="Delete Picture"/>
     </form>

    
    </div>
  )
};

export default ProfPic;
