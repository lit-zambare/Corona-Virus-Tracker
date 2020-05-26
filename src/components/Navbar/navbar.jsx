import React from 'react';
import styles from './navbar.module.css';
import {Link} from 'react-router-dom';
import { Paper, Tabs, Tab } from '@material-ui/core';
import cx from 'classnames';
import { FaAlignRight } from 'react-icons/fa';

const Navbar = ({AllCountriesData}) => {

  const [toggle,setToggle] = React.useState(false);

const Toggle = () => {
    setToggle(toggle => !toggle);
}

  return(
    <div className={styles.navBar}>
      <button onClick={Toggle}>
         <FaAlignRight/>
      </button>
      <ul className={toggle ? cx(styles.links,styles.show_nav) : styles.links}>
          <li><Link onClick={Toggle} style={{ color:"white" , textDecoration: 'none' }} to="/">Global</Link></li>
          <li><Link onClick={Toggle} style={{ color:"white" ,textDecoration: 'none' }} to="/WorldMap">World-Map</Link></li>
          <li><Link onClick={Toggle} style={{ color:"white" ,textDecoration: 'none' }} to="/India">India</Link></li>
          <li><Link onClick={Toggle} style={{ color:"white" ,textDecoration: 'none' }} to="/About">About</Link></li>
      </ul>
    </div>
  
    )
}	

export default Navbar;
