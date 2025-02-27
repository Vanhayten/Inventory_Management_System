
const registerUser = (answer)=>{

    return{
        type : 'REGISTER_USER',
        payload : answer
    }
}

const setAuthenticated = (isAuthenticated) =>{
    return {
        type: "SET_AUTHENTICATED",
        payload: isAuthenticated
    }
}
  
const setToken = (token) =>{
    return {
        type: "SET_TOKEN",
        payload: token
    }
}
  
const logout = () => {
    return {
        type: "LOGOUT"
    }
}
  
const userEmail =(email)=>{
    return{
        type: 'USER_EMAIL',
        payload : email
    }
}

const isAdmin =(value)=>{

    return{
        type: 'IS_ADMIN',
        payload: value
    }
}

const userFallName =(faullName)=>{

    return{
        type: 'USER_FULL_NAME',
        payload: faullName
    }
}

const handellError = (message)=>{
    return{
        type : 'ERROR_MESSAGE',
        payload: message
    }
}

const registerThunk = (user) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_URL; 
        const url = `${baseURL}/register`;
        const data = {...user}
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data register receved', datarecived )
        dispatch(registerUser(datarecived.message))
        dispatch(handellError(datarecived.error))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const loginThunk = (user) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_URL; 
        const url = `${baseURL}/login`;
        const data = {...user}
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data login recived', datarecived )
        dispatch(setToken(datarecived.token))
        dispatch(isAdmin(datarecived.isAdmin))
        dispatch(setAuthenticated(true))
        dispatch(handellError(datarecived.error))
        dispatch(userEmail(datarecived.userEmail)) //to delete the user from login table
        dispatch(userFallName(datarecived.fullName))
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

const LogOutThunk = (useremail) => async (dispatch)=>{
    try{
        const baseURL = process.env.REACT_APP_API_URL; 
        const url = `${baseURL}/logout`;
        const data = {email : useremail}
    
        const header = {
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify(data)
        };
        
        const response = await fetch(url ,header );
        const datarecived = await response.json();
        console.log('data loged out recived', datarecived.message )
    }catch(err){
        console.error(err)
        dispatch(handellError(err))
    }
}

export {registerThunk, loginThunk, LogOutThunk}