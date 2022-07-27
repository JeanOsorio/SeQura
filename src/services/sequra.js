import fetchRequest from "./communication";

const SeQuraServices = () => {
  let cache = {};
  const getCreditAgreements = (amount) => {
    return cache[amount] ? Promise.resolve(cache[amount]) : fetchRequest
      .http(`credit_agreements?totalWithTax=${amount}`, {}, {}, "GET", {})
      .then((response) => {
        cache[amount] = response;
        return response;
      })
      .catch((error) => console.log(error));
  };
  const postEvent = (data) => {
    return fetchRequest
      .http(`events`, {}, { "Content-Type": "application/json" }, "POST", data)
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error));
  };

  return {
    getCreditAgreements,
    postEvent,
  };
};

export default SeQuraServices();
