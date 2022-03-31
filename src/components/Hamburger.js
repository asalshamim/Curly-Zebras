import icon from '../assets/graphics/navicon.svg';

export default function Hamburger({ openMenu }) {
    return (
        <div onClick={openMenu} className="hamburger-wrapper">
            <div className="hamburger-container">
                <img src={icon} alt="hamburger" className="hamburger-icon"/>
            </div>
        </div>
    )
}
