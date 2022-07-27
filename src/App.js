import React, { useEffect, useState } from "react";
import { Button, Header, CreditAgreements, Wrapper } from "./components";
import SeQuraServices from "./services/sequra";

let updateTotalAmount = () => {};

function App({ merchantId, updatePriceEvent }) {
  const [totalAmount, setTotalAmount] = useState(null);
  const [creditAgrements, setCreditAgreements] = useState([]);

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
    SeQuraServices.getCreditAgreements(amount).then((response) =>
      setCreditAgreements(response)
    ).catch(error => console.error(error));
  };

  return(
    <Wrapper data-test-id="SeQuraPayments">
      <Header>
        <h3>Págalo en:</h3>
        <Button>más info</Button>
      </Header>
      <CreditAgreements creditAgreements={creditAgrements}/>
    </Wrapper>
  );
}

export { updateTotalAmount };

export default App;
