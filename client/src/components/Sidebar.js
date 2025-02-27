import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Sidebar.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {LogOutThunk} from '../actions/IMSAction'
function Sidebar(props){
    const [active, setActive] = useState(1)

    const handelLogout =(e)=>{
        e.preventDefault()
        props.logout(props.userEmail)
    }

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
                <li className={active === 1 ? 'active link': 'link'} onClick={e => setActive(1)}>
                    <Link to='/'  className='link'><i className="bi bi-grid-1x2-fill"></i> Dashboard</Link>
                </li>
                <li className={active === 2 ? 'active link': 'link'} onClick={e => setActive(2)}>                   
                    <Link to='/stock' className='link'><i className="bi bi-tags-fill"></i> View Stock</Link>
                </li>
                <li className={active === 3 ? 'active link': 'link'} onClick={e => setActive(3)}>                    
                    <Link to='/products' className='link'><i className="bi bi-award-fill"></i> Products</Link>
                </li>
                <li className={active === 4 ? 'active link': 'link'} onClick={e => setActive(4)}>                    
                    <Link to='/users' className='link'><i className="bi bi-people-fill"></i> Users</Link>
                </li>
                <li className={active === 5 ? 'active link': 'link'} onClick={e => setActive(5)}>                    
                    <Link to='/categories' className='link'><i class="bi bi-grid-3x3-gap-fill"></i> Categories</Link>
                </li>
                <li className={active === 6 ? 'active link': 'link'} onClick={e => setActive(6)}>                   
                    <Link to='/brands' className='link'><i className="bi bi-flag-fill"></i> Brands</Link>
                </li>
                <li className={active === 7 ? 'active link': 'link'} onClick={e => setActive(7)}>
                    <Link to='/' className='link'><i className="bi bi-gear-wide-connected"></i> Settings</Link>
                </li>
            </ul>
             
            <hr/>
            <ul className='mainlinks '>
                <li className={active === 8 ? 'active link': 'link '} onClick={e => setActive(8)}>
                    <Link className='Link ' to='/login' >
                        <a onClick={handelLogout} href={() => false} className='logout'><i className="bi bi-box-arrow-right "></i> Log Out</a> 
                    </Link>              
                </li>
            </ul>
            <hr/>
            
        </div>
    )
}

const mapStateToProps =(state)=>{
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        isAdmin : state.isAdmin,
        userEmail : state.userEmail,
        userfullName : state.userfullName
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        logout : (user)=>{
            dispatch(LogOutThunk(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Sidebar);
