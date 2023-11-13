import React, {useState, useEffect} from 'react';

function Users({users}) {

    return (
        <div id='users' style={{display:'flex',justifyContent:'center'}}>
            <button onClick={()=>console.log(users)}>users</button>
            
        </div>
    )
}

export default Users;