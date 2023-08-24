import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Sidebar.css'
function Sidebar(){
    const [active, setActive] = useState(1)

    return(
        <div className=' sidebar d-flex justify-content-between flex-column bg-dark text-white'>
            <div className='userInfo'>
               <div className='userImage'> <i className="bi bi-person-fill"></i></div> 
               <div className='username'>
                    <h3> User Name</h3>
                    <p>(admin)</p>
               </div>
            </div>
            {/*<div className='lines'> <div className='line'></div>MAIN<div className='line'></div></div>*/}
            <ul className='mainlinks'>
                <li className={active === 1 ? 'active link': 'link'} onClick={e => setActive(1)}><i class="bi bi-grid-1x2-fill"></i> Dashboard</li>
                <li className={active === 2 ? 'active link': 'link'} onClick={e => setActive(2)}><i className="bi bi-tags-fill"></i> View Stock</li>
                <li className={active === 3 ? 'active link': 'link'} onClick={e => setActive(3)}><i className="bi bi-award-fill"></i> Products</li>
                <li className={active === 4 ? 'active link': 'link'} onClick={e => setActive(4)}><i className="bi bi-people-fill"></i> Users</li>
                <li className={active === 5 ? 'active link': 'link'} onClick={e => setActive(5)}><i class="bi bi-grid-3x3-gap-fill"></i> Categories</li>
                <li className={active === 6 ? 'active link': 'link'} onClick={e => setActive(6)}><i className="bi bi-flag-fill"></i> Brands</li>
            </ul>
            {/*<div className='lines'> <div className='line'></div>CUSTOMIZE<div className='line'></div></div>*/}
            <ul className='mainlinks'>
                
            </ul>
            <ul className='mainlinks'>
                <li className={active === 7 ? 'active link': 'link'} onClick={e => setActive(7)}><i className="bi bi-gear-wide-connected"></i> Settings</li>
                <li className={active === 8 ? 'active link': 'link'} onClick={e => setActive(8)}>
                    <a ><i class="bi bi-box-arrow-right"></i> Log Out</a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;