import React from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router-dom'
import CostumerService from '../services/costumer'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '10px',
      border: 'none',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '360px',
      boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      border: '1px solid #F5F5F5'
    },
  };

export default function AreYouSure({modalIsOpen, setModalIsOpen, id}) {

    let history = useHistory();


    const closeModal = () => {
        setModalIsOpen(false)
    }

    const deleteCostumer = async () => {
        CostumerService.deleteCostumer(id)
            .then((response)=>{
                console.log(response)
                history.push('/costumer-list')
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
    }

    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h1 className="text-xl font-bold mt-1">Emin misiniz?</h1>
                <p className="text-sm mt-1">Müşteriyi kalıcı olarak silmek istediğiniden emin misiniz?</p>
                <p className="sub-header">Unutmayın bu işlem geri <span className="font-bold">alınamaz.</span></p>
                <div className="flex mt-5">
                    <button onClick={deleteCostumer} className="flex-1 mr-2 btn btn-danger">Eminim, Sil</button>
                    <button onClick={closeModal} className="flex-1 ml-2 btn hover:bg-blue-50">Vazgeç</button>
                </div>
            </Modal>       
        </div>
    )
}
