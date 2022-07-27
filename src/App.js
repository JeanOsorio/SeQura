import React, { useEffect, useState } from "react";
import { Button, Header, Select, Wrapper } from "./components";
import SeQuraServices from "./services/sequra";

let updateTotalAmount = () => {};

function App({ merchantId, updatePriceEvent }) {
  const [totalAmount, setTotalAmount] = useState(null);
  const [creditAgrement, setCreditAgreement] = useState([]);

  useEffect(() => {
    if (!totalAmount) {
      window.addEventListener("UpdatePrice", (event) => {
        setTotalAmount(event.detail.totalAmount / 100);
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
      setCreditAgreement(response)
    ).catch(error => console.error(error));
  };

  return (
    <Wrapper data-test-id="SeQuraPayments">
      <Header>
        <h3>Págalo en:</h3>
        <Button>más info</Button>
      </Header>
      <Select>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </Select>
    </Wrapper>
  );
}

export { updateTotalAmount };

export default App;
