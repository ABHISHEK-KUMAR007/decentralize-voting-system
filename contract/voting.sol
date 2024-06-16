// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;


contract Ballot {
   
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        uint vote;   // index of the voted proposal
    }

    struct Candidate {
        string name;   // candidate name 
        uint voteCount; // number of accumulated votes
    }

    address public chairperson;

    mapping(address => Voter) public voters;

    Candidate[] public candidates;
    
   
    uint public startTime;
    uint public endTime;

    constructor(string[] memory candidateNames,uint duration) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        
        
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
        startTime=block.timestamp;
        endTime=block.timestamp+(duration* 1 minutes) ;
    }
    
    // MODIFIERS
    modifier onlySmartContractOwner() {
        require(
            msg.sender == chairperson,
            "Only chairperson can start and end the voting"
        );
        _;
    }
    
    
    
    function addCandidates(string[] memory candidateNames) 
        public 
        
    {
        
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
    }
    
   
    function giveRightToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function vote(uint candidate) 
        public
        
    {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = candidate;

        // If 'candidate' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        candidates[candidate].voteCount += sender.weight;
    }

    function winningCandidate() 
        public
        
        view
        returns (string memory winnerName_)
    {
        require(block.timestamp>endTime,"voting time");
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winnerName_ = candidates[p].name;
            }
        }
    }

    function getAllCandidate() external view returns(Candidate[]  memory) {

        // for(uint i=0;i<candidates.length;i++){
        //     candidates[i];
        // }
        return candidates;



    }

    function remainnigTime()public view returns(uint ){
        require(block.timestamp<endTime && block.timestamp>startTime,"time end");
        uint x=(endTime-block.timestamp);
        return x;

    }   
}
