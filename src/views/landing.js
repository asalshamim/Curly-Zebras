import React from 'react';
import logo from '../../assets/graphics/airbean-landing.svg';
import { useHistory } from 'react-router-dom';
import landingStyles from '../Landing/Landing.module.css'
import landingLeft from '../../assets/graphics/intro-graphic-left.svg'
import landingRight from '../../assets/graphics/intro-graphic-right.svg'
import { motion } from 'framer-motion';




export default function Landing() {

    const history = useHistory();


    return (
        <motion.div data-testid="historyPushBtn"
            onClick={() => history.push('/menu')}
            className={landingStyles.landingBody}>

            <img data-testid='img-logo'
                alt=""
                className={landingStyles.landingLogo}
                src={logo}></img>

            <img data-testid='img-landingLeft'
                alt=""
                src={landingLeft}></img>

            <img data-testid='img-landingRight'
                alt=""
                className={landingStyles.landingRight}
                src={landingRight}></img>
        </motion.div>
    );
}

