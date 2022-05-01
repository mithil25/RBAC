import React,{useState} from 'react'

function Content() {
  const [accessCode,setAccessCode]=useState('');
  return (
    <div className='main'>
        <div className='main-1'>
            <div>
                Name
            </div>
            <div>
                Role
            </div>
        </div>
        <div className='main-2'>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    console.log(e)
                }}>
                    <input value={accessCode} className='code' type={'text'} onChange={(e)=>{setAccessCode(e.target.value)}} required/>
                    
                    <button>Submit</button>
                </form>
        </div>
    </div>
  )
}

export default Content