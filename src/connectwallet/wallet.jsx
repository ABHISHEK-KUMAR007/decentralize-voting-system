import {useContext,useState,useEffect} from "react"
import userContext from "../context/web3context.jsx"
import {ConnectWallet} from "./connectwallet.jsx"
export const Wallet =({children})=>{
    
    const [state,setState]=useState({
        Account:null,
        provider:null,
        contract:null,
        chainId:null
    })
   
        const HandleAccount=async()=>{
            try{
              
                const [Account,provider,contract,signer,chainId]=await ConnectWallet();
                
                setState({Account,provider,contract,signer,chainId});
                

        //console.log(Account,provider,contract,signer,chainId);
        //console.log(Account,provider,contract,signer,chainId);
        }catch(err){
            console.log("could not fetch detail",err)
        }
            
    }
    const HandleAccountChanged=async(setState)=>{
    
        const accounts=await window.ethereum.request({
            method:'eth_requestAccounts'
        });
        const Account=accounts[0];
        setState(prevState=>({...prevState,Account}))
       
    }   
   //     console.log(Account,provider,contract,signer,chainId);
    useEffect(()=>{
        window.ethereum.on("accountsChange",()=>HandleAccountChanged(setState))
    
    });
    //console.log("kl:+>",state.Account);
    

    return(
        <>
            <userContext.Provider value={state}>
            {children}

            </userContext.Provider>
            <button onClick={ HandleAccount}>connect wallet</button>
            {`Account:${state.Account}`}
        </>
    )

    
}
//export default Wallet;