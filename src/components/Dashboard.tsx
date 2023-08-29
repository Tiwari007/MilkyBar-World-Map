import { useState, useRef } from "react";
import classes from "../App.module.css";
import HomeIcon from "../icons/HomeIcon";
import MilkyBar from "../icons/MilkyBar";
import PassPortBackCover from "../icons/PassPortBackCover";
import Store from "../icons/Store";
import fallbackImage from "../assets/profilePic.png";
import Home from "./Home";
import Modal from '@mui/material/Modal';
import EditImage from "../icons/EditImage";
import DownloadIcon from "../icons/DownloadIcon";

import { Link } from 'react-router-dom'
import html2canvas from 'html2canvas'
import PassportSecondPage from "../icons/PassportSecondPage";

const Dashboard = () => {

    const componentRef = useRef(null)

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleDownloadComponent = () => {
        const component = componentRef.current;

        if (component) {
            html2canvas(component).then(canvas => {
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = 'component.png';
                link.click()
            })
        }
    }


    return (
        <>
            <div className={classes.dashboard__container} ref={componentRef} >
                <header>
                    <MilkyBar />
                    <Link to="/store"><Store /></Link>
                    <a href="#"><HomeIcon /></a>
                </header>
                <main>
                    <div className={classes.background__passport}>
                    <PassPortBackCover />
                    </div>
                    <div className={classes.passportContainer}>
                        <div className={classes.passportContainerBack}>
                            <img
                                style={{ position: "relative" }}
                                src={localStorage.getItem("imageData") || fallbackImage}
                                alt="userImage"
                                height={100}
                                width={100}
                            />
                            <p onClick={handleOpen} style={{ position: "absolute", top: "1%", left: "42%" }}><EditImage /></p>
                            <div style={{ padding: "12px", fontSize: "1rem" }}>
                                <p className={classes.name}>Name</p>
                                <p className={classes.tagName}>{localStorage.getItem("name") || "Name"}</p>
                                <p className={classes.tagHeadline}>I’m ready to discover the world !</p>
                            </div>
                        </div>

                        <div className={classes.passportContainerFront}>
                            <PassportSecondPage />
                        </div>
                    </div>
                </main>
                <footer className={classes.buttonClass} onClick={handleDownloadComponent}>
                    <DownloadIcon />
                </footer>
            </div>

            <Modal open={open}
                onClose={handleClose}
                style={{ marginTop: "30px" }}
            >
                <Home onClose={handleClose} />
            </Modal>

        </>
    );
};

export default Dashboard;

