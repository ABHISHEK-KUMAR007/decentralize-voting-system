import { useRef, useContext } from "react";
import usercontext from "../../context/web3context.jsx";

export const GiveVote = () => {
  const val = useRef();
  const { contract } = useContext(usercontext);

  const Vote = async (e) => {
    e.preventDefault();
    try {
      console.log("hii1")
      const Value = parseInt(val.current.value.trim()); // Convert input value to integer
      console.log(Value)
      if (isNaN(Value)) {
        alert("Enter a valid number");
        } else {
        console.log("hii2")
        const vt = await contract.vote(Value-1);
        console.log("hii22")
        const receipt = await vt.wait();
        console.log("hii222")
        if (receipt.status === 1) {
          console.log("hii3")
          alert("Voting is done");
          console.log("done")
          setTimeout(() => {
            // You can add some code here if needed
            }, 3000);
            val.current.value = "";
            } else {
              alert("Transaction failed");
              }
              }
              } catch (err) {
                console.log(err);
                }
              console.log("hii4")
                };

  return (
    <form onSubmit={Vote}>
      <label>Vote</label>
      <input type="number" ref={val} />
      <button type="submit">Vote</button>
    </form>
  );
};