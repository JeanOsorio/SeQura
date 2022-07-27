import React, { useEffect, useState } from "react";
import { Button, CreditAgreements, Header, Modal, Wrapper } from "./components";
import SeQuraServices from "./services/sequra";

let updateTotalAmount = () => {};

function App({ updatePriceEvent }) {
  const [totalAmount, setTotalAmount] = useState(null);
  const [creditAgreements, setCreditAgreements] = useState([]);
  const [selectedCreditAgreement, setSelectedCreditAgreement] = useState(null);
  const [instalmentFee, setInstalmentFee] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!totalAmount) {
      window.addEventListener("UpdatePrice", (event) => {
        setTotalAmount(event.detail.totalAmount);
      });
    } else {
      getCreditAgreementByAmount(totalAmount);
    }

    return (() => {
      window.removeEventListener("UpdatePrice", updatePriceEvent);
    });
  }, [totalAmount]);

  useEffect(() => {
    if (!selectedCreditAgreement) {
      return;
    }

    const fee = creditAgreements.find((ca) =>
      ca.instalment_count === selectedCreditAgreement
    );
    setInstalmentFee(fee.instalment_fee);
  }, [selectedCreditAgreement]);

  const getCreditAgreementByAmount = (amount) => {
    SeQuraServices.getCreditAgreements(amount).then((response) => {
      setCreditAgreements(response);
      setSelectedCreditAgreement(response[0].instalment_count);
    }).catch((error) => console.error(error));
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Wrapper data-test-id="SeQuraPayments">
      <Header>
        <h3>Págalo en:</h3>
        <Button onClick={handleModal}>más info</Button>
      </Header>
      <CreditAgreements
        creditAgreements={creditAgreements}
        selectedCreditAgreement={selectedCreditAgreement}
        setSelectedCreditAgreement={setSelectedCreditAgreement}
      />
      <Modal isOpen={openModal} handleModal={handleModal} instalmentFee={instalmentFee}/>
    </Wrapper>
  );
}
export default App;
