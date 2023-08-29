import { Link } from 'react-router-dom'
import HomeIcon from "../icons/HomeIcon";

const Store = () => {

    const handleClearStorage = () => {
        localStorage.clear();
    }

  return (
    <div style={{display: "flex"}}>
        <Link to="/">
            <HomeIcon />
            <button style={{width: "150px", height: "40px", margin: "0 0 0 20px", backgroundColor: "transparent", fontWeight: "bolder"}} onClick={handleClearStorage}>Clear Local Storage</button>
        </Link>
    </div>
  )
}

export default Store