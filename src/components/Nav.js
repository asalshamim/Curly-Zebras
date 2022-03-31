import { useState } from 'react';
import Menu from './Menu';
import Hamburger from './Hamburger';

export default function Nav() {

    // initially we want our menuModal not to be displayed, hence we set the state to false.
    const [displayMenu, setDisplayMenu] = useState(false); 

    const handleOpenMenu = () => setDisplayMenu(true);
    const handleCloseMenu = () => setDisplayMenu(false);

    return (
        <div>
            {displayMenu ? <Menu closeMenu={handleCloseMenu} /> : <Hamburger openMenu={handleOpenMenu}/>}
        </div>
    )
}