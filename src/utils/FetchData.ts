import axios from "axios";

export const postAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/api/${url}`,
    post,
    {
      headers: { Authorization: token },
    }
  );

  return res;
};
export const getAPI = async (url: string, token?: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/api/${url}`,
    {
      headers: { Authorization: token },
    }
  );
  return res;
};

export const patchAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_API_BASE_URL}/api/${url}`,
    post,
    {
      headers: { Authorization: token },
    }
  );

  return res;
};
export const putAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_BASE_URL}/api/${url}`,
    post,
    {
      headers: { Authorization: token },
    }
  );

  return res;
};
export const deleteAPI = async (url: string, token?: string) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/${url}`, {
    headers: { Authorization: token },
  });

  return res;
};
