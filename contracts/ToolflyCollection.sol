//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721/ERC721URIStorage.sol";
import './lib/Ownable.sol';
import './interface/ILayerZeroEndpoint.sol';
import './interface/ILayerZeroReceiver.sol';
import './NonblockingLzApp.sol';

error NotTokenOwner();
error InsufficientGas();
error SupplyExceeded();
error NotPaidMint();

contract ToolflyCollection is Ownable, ERC721URIStorage, NonblockingLzApp {
    uint256 public counter;
    string public defaultTokenURI = "https://toolfly.xyz/token";
    uint256 public constant FREE_TRANSFERS_COUNT = 42;
    uint256 public constant FEE_PRECISION = 10000;
    uint256 public feeRate = 15000;
    uint256 public transfersCount = 0;

    // dev: we don't expect the user
    mapping(address => uint256[]) public ownedNFTs;

    event ReceivedNFT(
        uint16 _srcChainId,
        address _from,
        uint256 _tokenId,
        uint256 counter
    );

    constructor(
        address _endpoint
    ) ERC721('ToolFly Collection', 'TFLY') NonblockingLzApp(_endpoint) {}

    function setDefaultTokenURI(string memory newDefaultTokenURI) public onlyOwner {
        defaultTokenURI = newDefaultTokenURI;
    }

    function setFeeRate(uint newFeeRate) public onlyOwner {
        feeRate = newFeeRate;
    }

    function mint() external payable {
        uint256 newItemId = uint(keccak256(abi.encodePacked(counter, block.prevrandao, block.timestamp))) % 10000000;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, defaultTokenURI);

        unchecked {
            ++counter;
        }
    }


     function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    function crossChain(uint16 dstChainId, uint256 tokenId) public payable {
        if (msg.sender != ownerOf(tokenId)) revert NotTokenOwner();

        // Remove NFT on current chain
        unchecked {
            --counter;
        }
        _burn(tokenId);

        bytes memory payload = abi.encode(msg.sender, tokenId);
        uint16 version = 1;
        uint256 gasForLzReceive = 350000;
        bytes memory adapterParams = abi.encodePacked(version, gasForLzReceive);

        (uint256 messageFee, ) = lzEndpoint.estimateFees(
            dstChainId,
            address(this),
            payload,
            false,
            adapterParams
        );
        uint256 fee = transfersCount > FREE_TRANSFERS_COUNT ? messageFee * feeRate / FEE_PRECISION : messageFee;
        if (msg.value <= fee) revert InsufficientGas();

        _lzSend(
            dstChainId,
            payload,
            payable(msg.sender),
            address(0x0),
            adapterParams,
            messageFee
        );
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256
    ) internal override {
        ownedNFTs[to].push(firstTokenId);
        if (from == address(0)) return;

        uint256[] storage fromNFTs = ownedNFTs[from];
        for (uint256 i = 0; i < fromNFTs.length; i++) {
            if (fromNFTs[i] == firstTokenId) {
                fromNFTs[i] = fromNFTs[fromNFTs.length - 1];
                fromNFTs.pop();
                break;
            }
        }
    }

    function getOwnedNFTs(address nftOwner) public view returns (uint256[] memory) {
        return ownedNFTs[nftOwner];
    }

    function _nonblockingLzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 /*_nonce*/,
        bytes memory _payload
    ) internal override {
        address from;
        assembly {
            from := mload(add(_srcAddress, 20))
        }
        (address toAddress, uint256 tokenId) = abi.decode(
            _payload,
            (address, uint256)
        );

        _mint(toAddress, tokenId);
        unchecked {
            ++counter;
        }
        emit ReceivedNFT(_srcChainId, from, tokenId, counter);
    }

    // Endpoint.sol estimateFees() returns the fees for the message
    function estimateFees(
        uint16 dstChainId,
        uint256 tokenId
    ) external view returns (uint256) {
        bytes memory payload = abi.encode(msg.sender, tokenId);
        uint16 version = 1;
        uint256 gasForLzReceive = 350000;
        bytes memory adapterParams = abi.encodePacked(version, gasForLzReceive);

        (uint256 messageFee, ) = lzEndpoint.estimateFees(
            dstChainId,
            address(this),
            payload,
            false,
            adapterParams
        );
        uint256 fee = transfersCount > FREE_TRANSFERS_COUNT ? messageFee * feeRate / FEE_PRECISION : messageFee;
        return fee;
    }
}

