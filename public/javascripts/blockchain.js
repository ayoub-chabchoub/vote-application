/*if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // Set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    //web3 = new Web3("http://localhost:8545");
}*/

var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log("web3");
console.log(web3);

//web3.eth.personal.getAccounts().then(res => console.log(res));

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute deployedContract.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x0c336be6ae602ba1c9b9d61873c90f186b44af4a');

candidates = {
  "ayoub": "candidate-1",
  "alaa": "candidate-2"
}

//console.log("breakpoint2");
var rep;
function voteForCandidate(id) {
  var candidateName = $("input[name=votecandidate]:checked").val();
  
  
  //console.log(web3.eth.accounts[0]);
  var voteflag = confirm("Confirm Vote");

  if (voteflag == true) {

    contractInstance.voteForCandidate(candidateName, {
      from: web3.eth.accounts[2]
    }, function () {
      console.log(contractInstance.totalVotesFor.call(candidateName).toString());
      window.location = "/voteadded/" + id;
    });


    /*var candidateName = 'alaa';

    contractInstance.voteForCandidate(candidateName, {
      from: web3.eth.accounts[2]
    }, function () {
      console.log(contractInstance.totalVotesFor.call(candidateName).toString());});

    console.log("candidateName");
    console.log(candidateName);
    contractInstance.voteForCandidate(candidateName, {
      from: web3.eth.accounts[2]
    }, function () {
      console.log(contractInstance.totalVotesFor.call(candidateName).toString());
      var flag = confirm("pass");
      if(flag){
        window.location = "/voteadded/" + id;
      }
    });*/

    /*rep = contractInstance.voteForCandidate(candidateName, {
      from: web3.eth.accounts[2]
    }, function (err,data) {
      if(err){
        console.log("err");
        console.log(err);
      }
      console.log("rep");
      console.log(data);
      console.log(contractInstance.totalVotesFor.call(candidateName).toString());
      var flag = confirm("pass");
		if(flag){
      window.location = "/voteadded/" + id;
    }
    });*/
    /*console.log("rep");
    console.log(rep);*/
  }
}


var electionResults = (function getElectionResults() {
  var voteResults = {};
  candidateNames = Object.keys(candidates);

  for (var i = 0; i < candidateNames.length; i++) {
    var name = candidateNames[i];
    var val = contractInstance.totalVotesFor.call(name).toLocaleString();
    voteResults[name] = val;
  }
  console.log("voteResults");
  console.log(voteResults);
  return voteResults;
  
})();


// $(document).ready(function () {
//   candidateNames = Object.keys(candidates);
//   for (var i = 0; i < candidateNames.length; i++) {
//     let name = candidateNames[i];
//     let val = contractInstance.totalVotesFor.call(name).toString()
//     $("#" + candidates[name]).html(val);
//   }
// });