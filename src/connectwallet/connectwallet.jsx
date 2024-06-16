import {useState,} from "react";
import ABI from "../ABI/VoterAbi.json"
import {ethers,Contract} from "ethers"
export  const ConnectWallet=async()=>{

    try{
        let [Account,provider,contract,signer,chainId]=[null,null,null,null,null];

        if(window.ethereum===null){
            throw new Error("install metamask");
        }
        
        
        
        const accounts=await window.ethereum.request({method:"eth_requestAccounts"});
        Account=accounts[0];
        
        
        
        const chainIdHex=await window.ethereum.request({method:"eth_chainId"});
        chainId=chainIdHex.toString();
        



        const ContractAddress="0x4032e0c811940914c6c9d893448541fa3187b425";
        provider= new  ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        contract=new Contract(ContractAddress,ABI,signer);
        //console.log("hii2")
        //console.log(Account,provider,contract,signer,chainId);
        return [Account,provider,contract,signer,chainId]
    }
    catch(error){
        throw new Error("can't connect the wallet")
    }
    

}
//export default ConnectWallet;