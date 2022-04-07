import { useEffect, useState } from 'react';

import droneSvg from '../assets/graphics/drone.svg';
import loader from '../assets/graphics/drone.svg';
import { useNavigate } from 'react-router-dom';

export default function Status() {

    const [loading, setLoading] = useState(true);
    const [eta, setEta] = useState([]);
    const [orderNumber, setOrderNumber] = useState([]);
    //const history = useHistory();

    let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/menu`; 
    navigate(path);
  }

    useEffect(() => {
        setLoading(true);
        fetch(`https://my-json-server.typicode.com/zocom-christoffer-wallenberg/airbean/order`,
        {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setEta(data.eta);
                setOrderNumber(data.orderNr);
                setLoading(false);
            })

    }, [])

    // Before we have gotten the Data from the API, loading renders. 
    if (loading) {
        return (
        <div className="loading-container">
            <img className="loading-png" alt="loader-png" src={loader}></img>
            <p> Din beställning är på väg.</p>
        </div>
        )
    }

    return (
        <div className="status-container">
            <div className="div-p-svg">
                <p className="status-p">Ordernummer <strong>{orderNumber}</strong></p>
                <img alt="drone-svg" src={droneSvg}></img>
            </div>
            <div className="status-div">
                <h2 className="status-h2-styling">Din beställning <br/> är på väg!</h2>
            </div>
            <p className="eta-time"><strong>{eta}</strong> minuter</p>
            <button onClick={routeChange} > Ok, Cool! </button>

        </div>
    )
}