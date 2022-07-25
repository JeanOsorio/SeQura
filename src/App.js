import React, { useEffect, useState } from "react";
import { Button, Header, Select, Wrapper } from "./components";

let updateTotalAmount = () => {};

function App({ merchantId, updatePriceEvent }) {
  const [totalAmount, setTotalAmount] = useState(null);
  useEffect(() => {
    window.addEventListener("UpdatePrice", (event) => {
      console.log("from component: ", event.detail.totalAmount);
      setTotalAmount(event.detail.totalAmount);
    });
    return () => {
      window.removeEventListener("UpdatePrice", updatePriceEvent);
    };
  }, []);

  return (
    <Wrapper>
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
