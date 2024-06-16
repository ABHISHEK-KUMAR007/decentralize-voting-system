
import {useEffect,useState,useContext} from "react"
import userContext from "../../context/web3context.jsx";
export function DAccount(){
    const [accountn,setAccountn]=useState(null);
    
    
    const {Account}=  useContext(userContext);
     useEffect(()=>{
        setAccountn(Account);
     },[]);

    return(
        <div>
            <p className="connected-ac">
            {accountn ? accountn : "connect Account"}</p>
        </div>
    );
}
//export default ;