import { useEffect, useState } from "react";

const DEFAULT_HEADER = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

const useFetch = ({ url = "", method = "GET", headers = {} }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
      method,
      headers: {
        ...DEFAULT_HEADER,
        ...headers,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        setData(data);
      })
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers)]);

  return { data, isLoading, error };
};

export default useFetch;
