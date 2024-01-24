const json = `application/json`;
const multPart = `multipart/form-data`;

/**
 *
 * @param {*string} contentType
 * @param {*string} method
 * @param {*string} url
 * @param {*} data
 * @returns Promise
 */
const unAuthRequest = async (contentType, method, url, data) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': contentType,
      'Origin' : 'https://clinique-france-frontend.vercel.app'
    },
    credentials:"include",
    body: JSON.stringify(data),
  });
  if (response) return response.json();
  throw new Error('Api call failed');
};

export const unFormDataRequest = async (contentType, method, url, data) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': contentType,
    },
    body: data,
  });
  if (response) return response.json();
  throw new Error('Api call failed');
};

export const postUnauthRequest = (url, data) =>
  unAuthRequest(json, 'POST', url, data);
export const patchUnauthRequest = (url, data) =>
  unAuthRequest(json, 'PATCH', url, data);
export const putUnauthRequest = (url, data) =>
  unAuthRequest(json, 'PUT', url, data);
export const putRequestFormData = (url, data) =>
  unFormDataRequest(multPart, 'PUT', url, data);
export const getUnauthRequest = (url) => unAuthRequest(json, 'GET', url);
export const deleteUnauthRequest = (url) => unAuthRequest(json, 'DELETE', url);
