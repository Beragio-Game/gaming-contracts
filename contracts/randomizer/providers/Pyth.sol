// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";
import "../Access.sol";
import "../../interfaces/randomizer/IRandomizerRouter.sol";

contract PythProvider is Access {
    event FlipRequested(uint64 sequenceNumber);
    event FlipResult(bool isHeads);
    IEntropy public  entropy;
    address public provider;
    IRandomizerRouter public router;
    mapping(uint256 => uint256) public routerRequestIds;

    mapping(uint256 => uint32) public counts; 
    constructor(address _entropy, address _provider) {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    changeEntropy(_entropy);
    changeProvider(_provider);

   
    
  
  }
    function setRouter(IRandomizerRouter _router) external onlyGovernance {
    router = _router;
    grantRole(ROUTER_ROLE, address(_router));
  }
    function changeEntropy(address _entropy) public onlyGovernance {
     entropy = IEntropy(_entropy);
    grantRole(RANDOMIZER_ROLE, address(_randomizer));
  }
    function changeProvider(address _provider) public onlyGovernance {
    provider = _provider;

  }
   
  function request(bytes32 userCommitment) external payable {
    // checks
    uint128 requestFee = entropy.getFee(provider);
    if(msg.value < requestFee) revert("not enough fees");
 
    // pay the fees and request a random number from entropy
    uint64 sequenceNumber = entropy.request{value: requestFee}(provider, userCommitment, true);
 
    // emit event
    emit FlipRequested(sequenceNumber);
  }
  function fulfill(uint64 sequenceNumber, bytes32 userRandomness, bytes32 providerRevelation) external {
    bytes32 randomNumber = entropy.reveal(provider, sequenceNumber, userRandomness, providerRevelation);
 
    emit FlipResult(uint256(randomNumber) % 2 == 0);
  }



}