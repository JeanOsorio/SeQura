import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   display: grid;
   place-items: center;
   background: #00000024;
   top: 0;
   left: 0;
`;

const ModalContainer = styled.div`
   width: 500px;
   height: 400px;
   background: white;
`;

const ModalHeader = styled.div`
   height: 50px;
   display:flex;
   direction: row;
   flex-wrap: nowrap;
   justify-content: space-between;
   align-items: center;
   border-bottom: 1px solid #000;
   padding: 0 10px 0 10px;
`;

const ModalContent = styled.div`
   padding: 20px;
`;

const Modal = ({ isOpen, instalmentFee, handleModal }) => {
  return (isOpen &&
    (
      <ModalWrapper onClick={handleModal}>
        <ModalContainer>
          <ModalHeader>
            <span>Fracciona tu pago</span>
            <span>SeQura</span>
          </ModalHeader>
          <ModalContent>
            <p>
              1. Eliges "Fracciona tu pago" al realizar tu pedido y pagas sólo
              la primera cuota.
            </p>
            <p>2. Recibes tu pedido</p>
            <p>
              3. El resto de pagos se cargarán automáticamente a tu tarjeta.
            </p>
            <p>¡Así de simple!</p>
            <p>
              Además, en el importe mostrado ya se incluye la cuota unica
              mensual de {instalmentFee.string}/mes, por lo que no tendrás ninguna sorpresa.
            </p>
          </ModalContent>
        </ModalContainer>
      </ModalWrapper>
    ));
};

export { Modal };
