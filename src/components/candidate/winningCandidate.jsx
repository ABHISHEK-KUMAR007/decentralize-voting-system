import { useState,useContext} from "react"
import UserContext from '../../context/web3context.jsx';

export const WinningCandidate=()=>{
    const {contract}=useContext(UserContext);
    const [winner ,setWinner]=useState("yet to be decide");
    const getwinner=async()=>{
        try{
            const winnerN=await contract.winningCandidate();
            setWinner(winnerN);
        }catch(err){
            console.log("cannot decide winner",err);
        }
    }
    return(
        <div>
            <button className="Button" onClick={getwinner}>know winner</button>
            <p>winner is : {winner}</p>
        </div>
    )


}


