import { useState, useEffect } from "react";

//Hook qui permet de fetch les données à l'API en lui passant un URL en Props
const useFetch = (url) => {
  //States qui seront retournés par le Hook vers les composants qui les appelle
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const abortCont = new AbortController();

    // fetch(url, { signal: abortCont.signal })
    fetch(url, {
      signal: abortCont.signal,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);

          setError(err.message);
        }
      });
    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
