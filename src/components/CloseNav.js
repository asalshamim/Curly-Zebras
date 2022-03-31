import icon from '../assets/graphics/close.svg';

export default function CloseNav({ closeMenu }) {
    return (
        <div onClick={closeMenu} className="close-wrapper">
            <div className="hamburger-container">
                <img src={icon} alt="close-icon" className="close-icon"/>
            </div>
        </div>
    )
}