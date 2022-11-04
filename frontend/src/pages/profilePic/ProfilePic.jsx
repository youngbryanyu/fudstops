// ProfPic - create profPic.scss as well
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import { AuthContext } from "../../authContext/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import React from "react";
import "./profilePic.scss";
import defaultPfp from "../../components/default_pfp.png";

export default function ProfPic() {

    const { user } = useContext(AuthContext); // get user from auth context
    const [data, setData] = useState([]); // update data with current data
    const [fileObject, setFileObj] = useState({});
    const fileRef = useRef();


    // call to display your profile picture on first render
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current === true) {
            getCall();

            initialRender.current = false;
        }
    }, []);

    /* get PFP and set image data to response from HTTP request */
    const getCall = async () => {
        try {
            const response = await axios.get(`/image/${user.username}`);
            const imageData = response.data;
            setData(imageData);
            console.log(imageData);
        } catch (error) {
            console.log(error);
        }
    }

    /* delete PFP */
    const deleteCall = async () => {
        try {
            setData(null);
            const response = await axios.delete(`/image/${user.username}`);
        } catch (error) {
            console.log(error);
        }
    }

    /* handle uploading new PFP */
    const handleSubmit = async (event) => {
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
            getCall(); // update PFP after uploading
        } catch (error) {
            console.log(error)
        }
    }
    const handleFileSelect = (event) => { //update the selected file
        setFileObj(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    return (
        <div className="profilePic">
            <div className="top">
                <Navbar />
            </div>
            <div className="uploadFileForm">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        {
                            data && data.length != 0 ? (
                                <>
                                    <div>
                                        {data.map((singleData) => {
                                            const base64String = btoa(new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
                                                return data + String.fromCharCode(byte);
                                            }, ''));
                                            return <img className="image" src={`data:image/png;base64,${base64String}`} />
                                        })}

                                    </div>
                                </>
                            ) : (
                                <div>
                                    <img src={defaultPfp} className="image" />
                                </div>
                            )
                        }
                        <input className="uploadFile" type="file" onChange={handleFileSelect} ref={fileRef} />
                        <button onClick={handleSubmit}>Upload Image</button>
                        <button onClick={deleteCall}>Delete Profile Picture</button>

                    </form>
                </div>
            </div>
        </div>
    )
};

// TODO: add code to validate file type