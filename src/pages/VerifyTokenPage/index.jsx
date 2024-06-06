import React from "react"
import Color from 'color'

// rgba(52, 58, 64, 0.3) 

function VerifyTokenPage() {
   
  return (
   
      <div className="verify-token-modal" style={{ height: '100vh', width: '100vw', position:'absolute', backgroundColor: Color('#1976d2').darken(0.5).alpha(0.6).toString(),right:0, left:0, top:0, display: 'flex', justifyContent:'center', alignItems:'center',zIndex:100000000 }}>
          <div>
            <h1 style={{color:'white', fontWeight:'bold', fontSize:'24px'}}>Vérification du token... </h1>
          </div>
      </div>
  
      
  )
}

export default VerifyTokenPage