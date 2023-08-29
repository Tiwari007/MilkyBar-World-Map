import { useState, useRef } from 'react'
import Webcam from "react-webcam";
import classes from '../App.module.css'
import CameraIcon from '../icons/Camera'
import Refresh from '../icons/Refresh';
import Save from '../icons/Save';
import Close from '../icons/Close';


const Home = ({onClose}: any) => {
    const webcamRef = useRef<any>(null)
    const [isImage, setIsImage] = useState(false)
    const [name, setName] = useState<string | undefined>()
    const [nameError, setNameError] = useState<string>("")

    // lets create a state to store image data and 
    // if the data is already exist in localstorage fetch from there
    const [imageData, setImageData] = useState(localStorage.getItem('imageData' || ""))
    // const [name, setName] = useState(localStorage.getItem('name' || ""))


    const handleImageClick = async () => {
        // Let's implement camera access and image capture logic
        // console.log("current", webcamRef.current.getScreenshot());

        let base64Image;
        if (webcamRef.current) {
            base64Image = webcamRef.current.getScreenshot()
        }
        // Replace with actual image data
        setImageData(base64Image);
        setIsImage(!isImage)
    }

    const handleNameChange = (e: any) => {
        const newName = e.target.value;
        // name validation

        if(/^[A-Za-z]{0,30}$/.test(newName)){
            setName(newName)
            setNameError("")
        }
        else{
            setNameError("name should be contains only letters and it should not be greater than 30 characters 🙏")
        }
    }



    const handleForm = (e: React.MouseEvent) => {
        e.preventDefault()

        // save the image and name data to locxalstorage 
        if (name) localStorage.setItem("name", name)
        if (imageData) localStorage.setItem('imageData', imageData);


        // after collecting data navigate to next page where user can see all his/her details
        // navigate("/passport")
        onClose()

    }




    return (
        <form className={classes.home__component}>
            <div className={classes.homeComponent__cameraView}>
                <p onClick={onClose} style={{position: "absolute", left: "80%", zIndex: 100}}>
                    <Close />
                </p>
                {
                    !isImage ? <Webcam width="100%" ref={webcamRef} /> : <img src={imageData || ""} alt='userImage' />
                }

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleImageClick}>{!isImage ? <CameraIcon /> : <Refresh />}</div>

            </div>
            <div className={classes.homeComponent__name}>
                <input style={{marginTop: "20px"}} placeholder='Enter Your First Name' onChange={handleNameChange} type="text" name="name" id="name" />
                { nameError ? <p style={{padding: "10px", textAlign: "center"}}>{nameError}</p> : ""}
                <p style={{textDecoration: 'none', marginTop: "20px"}} onClick={handleForm}><Save /></p>
            </div>
        </form>

    )
}

export default Home


