const defaultParams = {};
const apiUrl = "http://localhost:8080";
const defaultHeaders = {};

const CommunicationService = (() => {
  const http = (
    path,
    params = {},
    headers = {},
    method = "GET",
    data,
    file = false,
  ) => {
    let fetchOptions = {
      method,
      body: file ? data : JSON.stringify(data),
      headers: Object.assign({}, defaultHeaders, headers),
    };

    if (method === "GET") {
      fetchOptions = {
        method,
        headers: Object.assign({}, defaultHeaders, headers),
      };
    }

    if (method === "PATCH") {
      fetchOptions = {
        method,
        body: JSON.stringify(data),
        headers: Object.assign({}, defaultHeaders, headers),
      };
    }

    return fetch(buildRequest(path, params), fetchOptions)
      .then(checkStatus)
      .then(parseJSON);
  };

  const buildRequest = (path, params) =>
    [
      apiUrl,
      buildPath(`/${path}`),
      paramsToUrl(Object.assign({}, defaultParams, params)),
    ].join("");

  const buildPath = (path) => path + (path.indexOf("?") !== -1 ? "&" : "?");

  const paramsToUrl = (params) =>
    Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&");

  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    if (response.status === 401) {
      window.location.replace("/");
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };

  const parseJSON = (response) => response.json();

  return { http };
})();

export default CommunicationService;
