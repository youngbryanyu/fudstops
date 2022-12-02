// ProfPic - create profPic.scss as well
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import { AuthContext } from "../../authContext/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import React from "react";
import "./profilePic.scss";
import defaultPfp from "../../components/default_pfp.png";
import imageCompression from 'browser-image-compression';

const MAX_FILE_SIZE = 10000; // 10 kb
const IMPORTING_MSG = "importing image...";
const DELETING_MSG = "deleting image...";
const UPLOADING_MSG = "uploading image...";

export default function ProfPic() {

    const { user } = useContext(AuthContext); // get user from auth context
    const [data, setData] = useState(null); // update data with current data
    const [fileObject, setFileObj] = useState({});
    const fileRef = useRef();
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(IMPORTING_MSG);

    // call to display your profile picture on first render
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current === true) {
            getCall();
            initialRender.current = false;
        }

        setTimeout(() => {
            getCall(); // rerender every second to check for PFP
        }, 1000);
    }, [data]);

    /* get PFP and set image data to response from HTTP request */
    const getCall = async () => {
        try {
            const response = await axios.get(`/image/${user.username}`);
            const imageData = response.data;
            setData(imageData);
        } catch (error) {
            console.log(error);
        }
    }

    /* delete PFP */
    const deleteCall = async (e) => {
        e.preventDefault();
        setMessage(DELETING_MSG);
        setShowMessage(true); // deleting --> show message to user
        try {
            await axios.delete(`/image/${user.username}`);
            setData(null);
        } catch (error) {
            console.log(error);
        }
        setShowMessage(false);
    }

    /* handle uploading new PFP */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(UPLOADING_MSG);
        setShowMessage(true); // deleting --> show message to user
        const formData = new FormData();
        formData.append("image", fileObject);

        /* write to DB */
        try {
            await axios({
                method: "post",
                url: `/image/${user.username}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            });
            getCall(); // get new image and show to user
        } catch (error) {
            console.log(error);
        }
        setShowMessage(false);
    }

    /* handle selecting an image file */
    const handleFileSelect = async (event) => {
        if (!event.target.files[0]) {
            console.log("file is undefined")
            return;
        }

        setMessage(IMPORTING_MSG);
        setShowMessage(true); // importing --> show message to user

        const image = event.target.files[0];
        const fileSize = image.size; // 100,000 = 100kb

        if (fileSize < MAX_FILE_SIZE) { // no need to compress small images
            setFileObj(image);
            console.log("no need to compress");
            setShowMessage(false);
            return;
        }

        /* compress file if larger than 25 kb */
        const options = {
            maxSizeMB: .01, // 1 kb
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        const compressedFile = await imageCompression(image, options);
        setFileObj(compressedFile);
        setShowMessage(false); // d
        console.log("size of compressed 2: " + compressedFile.size);
    }

    return (
        <div className="profilePic">
            <div className="top">
                <Navbar />
            </div>
            <div className="uploadFileForm">
                <div className="container">
                    <form>
                        {
                            data && data.length !== 0 ? (
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
                        <div className="message"> {/* recently submitted form message */}
                            <p style={{ visibility: !showMessage && "hidden" }}>
                                {message}
                            </p>
                        </div>
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