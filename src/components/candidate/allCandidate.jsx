import "./allCandidate.css";
import { useContext, useState, useEffect } from "react";
import UserContext from '../../context/web3context.jsx';

export const PrintCandidate = () => {
    const { contract } = useContext(UserContext);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const fetchCandidates = async () => {
        try {
            if (contract) {
                console.log("Fetching candidates...");
                const fetchedCandidates = await contract.getAllCandidate();
                //console.log("Fetched candidates:", fetchedCandidates);
                setCandidates(fetchedCandidates);
            } else {
                console.log("Contract not found or not initialized");
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false); // Update loading state regardless of success or failure
        }
    };

    useEffect(() => {
        if (contract) {
            fetchCandidates();
        }
    }, [contract]); // Trigger fetchCandidates when contract changes

    if (loading) {
        return <p>Loading...</p>; // Show loading indicator while fetching data
    }

    return (
        <div className="pt">
            <p>List of candidates</p>
            <div className="candidate-list">
                {candidates.map((candidate, index) => (
                    <div className="details" key={index}>
                        <p className="index">Id: {index + 1}</p>
                        <p className="name">{candidate.name}</p>
                        <p className="vote-count">Vote count: {candidate.voteCount.toString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrintCandidate;
