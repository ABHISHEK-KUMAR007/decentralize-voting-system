
import "./App.css"
import {Wallet} from "./connectwallet/wallet.jsx";
//import Display from "./components/displayPannle/display.jsx"
import {VoteTime} from "./components/displayPannle/votingTime.jsx"
import {GiveVote} from "./components/displayPannle/givevote.jsx"
import {DAccount} from "./components/displayPannle/displayAccount.jsx"
import {PrintCandidate} from "./components/candidate/allCandidate.jsx"
import {WinningCandidate} from "./components/candidate/winningCandidate.jsx"
const app=()=>{


    return(
        <div className="app">
            <Wallet>
                {/* <DAccount/> */}
                <WinningCandidate/>

                <VoteTime/>

                <GiveVote/>

                <PrintCandidate/>
            </Wallet>
        </div>
    )
    
}
export default app;