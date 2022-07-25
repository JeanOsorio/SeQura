import React from "react";
import { Button, Header, Select, Wrapper } from "./components";

const App = () => {
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
};

export default App;
