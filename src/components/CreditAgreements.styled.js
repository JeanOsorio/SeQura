import React, { useId } from "react";
import { Select } from "./Select.styled";

const CreditAgreements = ({ creditAgreements }) => {
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
    <Select>
      {renderOptions()}
    </Select>
  ));
};

export { CreditAgreements };
