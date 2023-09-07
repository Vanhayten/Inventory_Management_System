import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux'
import {bringBrandsThunk, addBrandThunk, updateBrandThunk, deleteBrandThunk} from '../actions/IMSAction'
import '../styles/Brands.css'

function Brands(props){
    const [showAlert, setShowAlert] = useState(false);
    const [records, setRecords] = useState(props.brands)
    const [condition, setCondition] = useState(null)
    
    const callBrands =()=>{
        props.getBrands()
    }
    useEffect(()=>{
        callBrands()
    }, [])
    const columns = [
        {
            name : 'Name',
            selector : row => row.name,
            sortable : true
        },
        {
            name : 'Created At',
            selector : row => row.created_date,
            sortable : true
        },
        {
            name : 'Updated At',
            selector : row => row.updated_date,
            sortable : true
        },
        {
            name : 'Deleted At',
            selector : row => row.deleted_date,
            sortable : true
        },
        {
            name: 'Actions',
            cell: (row) => (
              <div className='d-flex'>
                <span className="btn" data-toggle="modal" data-target="#updateBrand" onClick={() => clickUpdateButton(row)}><i className="bi bi-pencil-fill"></i></span>
                <span className='btn text-danger'   onClick={() => handleDelete(row)}><i className="bi bi-trash-fill"></i></span>
              </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
            
        }
    ];

    function handleCloseModal(){ 
           
        document.getElementById("addBrand").classList.remove("show", "d-block");
        document.getElementById("updateBrand").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }
    const filterByName =(e)=>{
        const newData = props.brands.filter(row =>{ 
            return row.name.toLowerCase().includes(e.target.value.toLowerCase()) 
        })
        setRecords(newData)
    }

    const HandellAddBrand =(e)=>{
        e.preventDefault()
        let newBrand = document.getElementById('name').value
        props.addBrand(newBrand)
        handleCloseModal()     
        setRecords(props.brands)
    }

    const clickUpdateButton=(row)=>{
        let newBrand = document.getElementById('upname')
        newBrand.value = row.name;
        setCondition(row.name)
    }
    const HandellUpdateBrand=(row)=>{
        let newBrand = document.getElementById('upname')
        props.updateBrand({newValue: newBrand.value, condition : condition})
        handleCloseModal()
        setRecords(props.brands)
    }
    
    const handleDelete=(row)=>{
        props.deleteBrand(row.name)
        if (props.deleteMsg) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }  
        setRecords(props.brands)
    }

    const tableCustomStyles = {
        headRow: {
          style: {
            color:'#223336',
            backgroundColor: 'lightBlue'
          },
        },
        rows: {
          style: {
            color: "STRIPEDCOLOR",
            backgroundColor: "STRIPEDCOLOR"
          },
          stripedStyle: {
            color: "NORMALCOLOR",
            backgroundColor: "NORMALCOLOR"
          }
        }
    }
    return(
        <div className='Brands' id='Brands'>
            <h1 className='mx-3'>Brands Manager</h1>
            <div className='filters'>
                <div className='dates mt-3'>
                    <div className='date'><label>From:</label><input type='date' name='from' id='from'></input></div>
                    <div className='date'><label>To:</label><input type='date' name='to' id='to'></input></div>
                </div>
                <input className='filterinp' type='text' placeholder='Filter by Name' onChange={filterByName}/>
            </div>
            <div className='container mt-3'>
                { showAlert? ( <div className="alert alert-success" role="alert"> {props.deleteMsg} </div> ):''}
                <DataTable 
                    title = {'Manage brands'}
                    columns ={columns}
                    data ={records} 
                    selectableRows 
                    selectableRowsHighlight
                    highlightOnHover
                    fixedHeader 
                    bordered
                    pagination
                    customStyles={tableCustomStyles}
                    actions ={<button type="button" className="btn btn-info" data-toggle="modal" data-target="#addBrand" >Add Brand</button>}
                >
                </DataTable>
            </div>
            {/* Add brand Modal */}
            <div className="modal fade" id="addBrand" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                    {showAlert && ( <div className="alert alert-success" role="alert"> {props.addMsgMsg} </div> )} 
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Add New Brand</h3>
                        <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div className="roo">
                            <label htmlFor="name">Name:</label>
                            <input id="name" type="text" name="name" placeholder='New brand name'/>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={HandellAddBrand}>Add Item</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Update brand Modal */}
            <div className="modal fade" id="updateBrand" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                    {showAlert && ( <div className="alert alert-success" role="alert"> {props.updateMsg} </div> )} 
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Update Brand</h3>
                        <span type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div className="roo">
                            <label htmlFor="upname">Name:</label>
                            <input id="upname" type="text" name="upname" placeholder='New brand name'/>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={HandellUpdateBrand}>Update Brand</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps =(state)=>{
    
    return{
        response : state.error,
        isAuthenticated : state.isAuthenticated,
        brands : state.brands,
        addMsg : state.addMsg,
        deleteMsg : state.deleteMsg,
        updateMsg : state.updateMsg
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        getBrands : ()=>{
            dispatch(bringBrandsThunk())
        },
        addBrand : (newBrand)=>{
            dispatch(addBrandThunk(newBrand))
        },
        updateBrand : (newBrand)=>{
            dispatch(updateBrandThunk(newBrand))
        },
        deleteBrand : (brand_name)=>{
            dispatch(deleteBrandThunk(brand_name))
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps) (Brands);

