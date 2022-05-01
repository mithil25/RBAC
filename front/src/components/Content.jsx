import React,{useState} from 'react'
import Modal from 'react-modal';
function Content() {
  const [accessCode,setAccessCode]=useState('');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  

  Modal.setAppElement('#root');
  
    let subtitle='Modal';
    const [modalIsOpen, setIsOpen] = useState(false);
  
    const openModal=()=> {
      setIsOpen(true);
    }
  
    const afterOpenModal=()=> {
        <div>
            <h1>Hello Mithil</h1>
        </div>
      // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
    }
  
    const closeModal=()=>{
      setIsOpen(false);
    }
  
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

                    <button >Submit</button>
                </form>
        </div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
      />
    </div>
  )
}
export default Content