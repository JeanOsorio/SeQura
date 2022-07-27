import React, { useEffect, useState } from "react";
import { Button, CreditAgreements, Header, Wrapper } from "./components";
import SeQuraServices from "./services/sequra";

let updateTotalAmount = () => {};

function App({ updatePriceEvent }) {
  const [totalAmount, setTotalAmount] = useState(null);
  const [creditAgrements, setCreditAgreements] = useState([]);
  const [selectedCreditAgreement, setSelectedCreditAgreement] = useState(null);

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

  const getCreditAgreementByAmount = (amount) => {
    SeQuraServices.getCreditAgreements(amount).then((response) => {
      setCreditAgreements(response);
      setSelectedCreditAgreement(response[0].instalment_count);
    }).catch((error) => console.error(error));
  };

   return (
      <Wrapper data-test-id="SeQuraPayments">
      <Header>
      <h3>Págalo en:</h3>
      <Button>más info</Button>
      </Header>
      <CreditAgreements
      creditAgreements={creditAgrements}
      selectedCreditAgreement={selectedCreditAgreement}
      setSelectedCreditAgreement={setSelectedCreditAgreement}
      />
    </Wrapper>
  );
}

export { updateTotalAmount };

export default App;
