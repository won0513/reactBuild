//Moudle

import React, {useState} from "react";
import Modal from 'react-modal';

import imgLogo from '../img/duck.png';
function LoadingModal() {

    const [isOpen, setIsOpen] = useState(true);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    return (
        <>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet"></link>
        <Modal
              isOpen={isOpen}
              onRequestClose={closeModal} style={{overlay: {
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
              },
              content: {
                position: 'absolute',
                fontFamily: "'Gowun Batang', serif",
                margin :'auto',
                border: '1px solid #ccc',
                background: 'rgba(255, 255, 255, 0)',
                outline: 'none',
                border: 'none',
                bottom: 100,
                width:200,
                height:210,
                padding: '20px'
              }}}>
                <div className="overlay-box" width="100px">
                  <img src={imgLogo} alt="로딩중" width="130px"/><p style={{fontSize:17, paddingLeft:20}}>loading..</p>
                </div>
              
            </Modal>
            </>
    )
}
export default LoadingModal;