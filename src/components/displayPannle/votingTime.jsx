import { useState, useContext, useEffect } from "react";
import userContext from "../../context/web3context.jsx";

export const VoteTime = () => {
  const { contract } = useContext(userContext);
  const [time, setTime] = useState(null); // Initialize time state with null initially
  const [fetchError, setFetchError] = useState(false); // State to track fetch error

  const fetchTime = async () => {
    try {
      if (contract && typeof contract.remainnigTime === 'function') {
        //console.log(contract);
        const timeInSeconds = await contract.remainnigTime();
      
        //const timeInMinutes = Math.floor(timeInSeconds / 60);
        //console.log(timeInMinutes);
        
        setTime(timeInSeconds);
        setFetchError(false); // Reset fetch error state
        //console.log("kk2");
      } else {
        setFetchError(true); // Set fetch error state if contract or remainingTime is not available
      }
    } catch (err) {
      console.log("Can't fetch the remaining time", err);
      setFetchError(true); // Set fetch error state in case of error
    }
  };

  useEffect(() => {
    fetchTime(); // Fetch time initially

    // Set up interval to fetch time every 1 second
    const intervalId = setInterval(() => {
      fetchTime(); // Fetch time every 1 second to update the display
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [contract]); // Only re-run effect if contract changes

  return (
    <p>
      {fetchError ? "Error fetching time" : time !== null ? `Remaining time: ${time} seconds` : "Fetching time..."}
    </p>
  );
};
