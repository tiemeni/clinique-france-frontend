import React from "react"

function VerifyTokenPage() {
   
  return (
      <div className="verify-token-modal" style={{ height: '100vh', width: '100vw', position:'absolute', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent:'center', alignItems:'center',zIndex:100000000 }}>
          <div>
            <h1 style={{color:'white'}}>Vérification du token... </h1>
          </div>
      </div>
  )
}

export default VerifyTokenPage