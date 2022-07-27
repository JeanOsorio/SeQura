import React from "react";
import { Select } from "./Select.styled";

const CreditAgreements = ({ creditAgreements, selectedCreditAgreement, setSelectedCreditAgreement }) => {
  const handleChange = (event) => {
    setSelectedCreditAgreement(parseInt(event.target.value));
  };
  const renderOptions = () => {
    if (creditAgreements.length === 0) {
      return;
    }
    return creditAgreements.map((ca) => (
      <option key={ca.instalment_count} value={ca.instalment_count}>
        {ca.instalment_count} cuota de {ca.instalment_total.string}/mes
      </option>
    ));
  };
  return (creditAgreements.length > 0 && (
    <Select onChange={handleChange} value={selectedCreditAgreement}>
      {renderOptions()}
    </Select>
  ));
};

export { CreditAgreements };
