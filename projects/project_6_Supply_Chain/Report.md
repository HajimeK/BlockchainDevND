# Ethereum Dapp for Tracking Items through Suuply Chain

Learn lower level components of establishing a soud web service architecture using Blockchain.

# Part 1 : Plan the project with write-ups

## Requirement 1: Project write-up - UML
This part should be easy! Simply add in the diagrams you create in Part A of the project. If any changes were made during the contract creation beside to add those changes to your UML diagrams and add them to your write up.

## Requirement 2: Project write-up - Libraries
If libraries are used in the project, the project write-up indicates which libraries and discusses why these libraries were adopted.

## Requirement 3: Project write-up - IPFS
If IPFS is used, the project write-up discusses how IPFS is used in this project.

# Part 2 : Write smart contracts

## Requirement 1: Define and implement required interfaces
First, download the provided starter code and review all the files. Add in any interfaces you use.

Download Starter Code

The starter code contains a skeleton for the smart contracts, test file, and migration files you will need to build out. Since there will be quite a bit of specialized logic, the code is split into smaller contracts that bundle related code together. The subcontract inheritance looks like this:

```
contract AccessControl
contract Base is AccessControl
contract Core is Base
```
**AccessControl - Collection of Contracts**: These contracts manages the various addresses and constraints for operations that can be executed only by specific roles.

**Base - SupplyChain.sol**: This is where we define the most fundamental code shared throughout the core functionality. This includes our main data storage, constants and data types, plus internal functions for managing these items.


```plantuml
Class Base
note right : main data storage,\nconstants\ndata types\ninternal functions for managing these items.
```

**Core - Ownable.sol**: is the contract that controls ownership and transfer of ownership.


```plantuml
Class Core
note right : the contract that controls\nownership \ntransfer of ownership
```

### Requirement 2: Build out AccessControl Contracts
From the Starter Code, the files in coffeeaccesscontrol controls access control for each actor.

Build out these contracts so that each actor’s role in your supply chain is distinct with no overlap in their access abilities. The abilities listed for each role are exhaustive.

*Example of 4 actors in a coffee supply chain are*:

| Actor | Capability |
|----|----|
| Farmer | The Farmer can harvest coffee beans, process coffee beans, pack coffee  palettes, add coffee palettes, ship coffee palettes, and track authenticity. |
| Distributor | The Distributor can buy coffee palettes and track authenticity. |
| Retailer | The Retailer can receive coffee palettes and track authenticity. |
| Consumer | The consumer can buy coffee palettes and track authenticity. |


```plantuml
:Farmer:
:Distributor:
:Retailer:
:Consumer:

Farmer -> (harvest coffee beans)
Farmer -> (process coffee beans)
Farmer -> (pack coffee palettes)
Farmer -> (add coffee palettes)
Farmer -> (shipt coffee palettes)
Farmer -down-> (track authenticity)

Distributor -> (buy coffee)
Distributor -down-> (track authenticity)

Retailer -> (receive coffee palettes)
Retailer -down-> (track authenticity)

Consumer -> (buy coffee palettes)
Consumer -down-> (track authenticity)
```

### Requirement 3: Build out Base Contract
From the Starter Code, SupplyChain.sol contract holds all common structs, events and base variables.

This smart contract must implement functions that track:

- Product ID
- Product UPC
- Origination Information
- Origin Actor (e.g. Farmer ID, Farmer Name, )
- Misc. organization information (e.g. Farmer Information)
- Longitude and Latitude of Origin Coordinates (e.g. Farm’s Longitude and Latitude)
- Product notes
- Product price

```plantuml

Class SupplyChain {
    {field} address owner
    {field} uint upc : Define a variable called 'upc' for Universal Product Code (UPC)
    {field} uint  sku;
    {field} mapping  items;
    {field} mapping  itemsHistory;
    {field} State
    {method} constructor() public payablen
    {method}kill() public
    {method}harvestItem(uint _upc, address _originFarmerID, string _originFarmName, string _originFarmInformation, string  _originFarmLatitude, string  _originFarmLongitude, string  _productNotes) public
    {method}processItem(uint _upc) public
    {method}packItem(uint _upc) public
    {method}sellItem(uint _upc, uint _price) public
    {method}buyItem(uint _upc) public payable
    {method}shipItem(uint _upc) public
    {method}receiveItem(uint _upc) public
    {method}purchaseItem(uint _upc) public
    {method}fetchItemBufferOne(uint _upc) public view returns
    {method}fetchItemBufferTwo(uint _upc) public view returns
}

Class Palette {
    {field}Product ID
    {field}Product UPC
    {field}Origination Information
    {field}Origin Actor 
    {field}Misc. organization information
    {field}Longitude and Latitude of Origin Coordinates (e.g. Farm’s Longitude and Latitude)
    {field}Product notes
    {field}Product price
}

Class Item <<struct>> {
    uint    sku
    uint    upc
    address originFarmerID
    string  originFarmName
    string  originFarmInformation
    string  originFarmLatitude
    string  originFarmLongitude
    uint    productID
    string  productNotes
    uint    productPrice
    State   itemState
    address distributorID
    address retailerID
    address consumerID
}

Abstract Class Owner {

}

Class Farmer {
    {field} Farmer ID
    {field} Farmer Name
    {field} Farmer Information
    {field} Farm's Longitude
    {field} Farm's Latitude
    {method} harvest()
    {method} pack()
    {method} process()
    {method} add{}
    {method} pack()
    {methond} ship{}
}

Class Distributor {
    {method} buyCoffee()
}

Class Retailer {
    {method} receiveCoffeePalletes
    {method}
}

Class Consumer {
    {method} buyCoffeePalletes
}

SupplyChain <-down- Owner
Owner <|-- Farmer
Owner <|-- Distributor
Owner <|-- Retailer
Owner <|-- Consumer

Class Roles <<library>> {
  {field} struct Role
  {method} function add(Role storage role, address account) internal
  {method} function remove(Role storage role, address account) internal
  {method} function has(Role storage role, address account) internal view returns (bool)
}

Class FarmerRole {
    {field} Roles.Role
}
Class DistributorRole {
    {field} Roles.Role
}
Class RetailerRole {
    {field} Roles.Role
}
Class ConsumerRole {
    {field} Roles.Role
}

Role <-- FarmerRole
Role <-- DistributorRole
Role <-- RetailerRole
Role <-- ConsumerRole

FarmerRole o-- Farmer
DistributorRole o-- Distributor
RetailerRole o-- Retailer
ConsumerRole o-- Consumer

Class Ownable {
    {field}  address private origOwner;
    {method} event TransferOwnership(address indexed oldOwner, address indexed newOwner);
    {method} constructor ()
    {methond} owner() public view returns (address)
    {methond} modifier onlyOwner()
    {field}address private origOwner;
    {method} event TransferOwnership(address indexed oldOwner, address indexed newOwner);
    {method} function isOwner() public view returns (bool)
    {method} function renounceOwnership() public onlyOwner 
    {method} function transferOwnership(address newOwner) public onlyOwner
    {method} function _transferOwnership(address newOwner) internal
}
```

### Requirement 4: Build out Core Contract
Ownable.sol is the contract that controls ownership and transfer of ownership.

This Core Contract must implement:

Ownable - Define an owner for all the contracts.
Secondary - Allows contract to be transferred owners.
This has been provided in the starter code.

## Part 3: Test smart contract code coverage

### Requirement: Smart contract has associated tests
For this project, as with any project, make sure to test your smart contracts to ensure they are working properly in different situations without any risk.


### Requirement: Smart contract has associated tests
At minimum, test every function for every function you implemented from your Sequence Diagram. For example, from this Sequence Diagram we would need to test 10 functions:

harvestItem()
processItem()
packItem()
addItem()
buyItem()
shiptItem()
receiveItem()
purchaseItem()
fetchItemBufferOne()
fetchItemBufferTwo()

```plantuml
entity Coffee
actor Farmer
actor Distributor
actor Retailer
actor Consumer

Farmer -> Coffee : harvestItem()
Farmer -> Coffee : processItem()
Farmer -> Coffee : packItem()
Farmer -> Coffee : addItem()
Distributor -> Farmer : buyItem()
Farmer -> Retailer : shipItem()
Retailer -> Farmer : receiveItem()
Consumer -> Retailer : purchaseItem()
Coffee -> Consumer : fetchItem()
Coffee -> Consumer : fetchItem()
```

| No. | test target | Test logic | Success Criteria |
|-----|-------------|------------|------------------|
|     |             |            |                  |
|     | harvestItem() |            |                  |
|     | processItem() |            |                  |
|     | packItem() |            |                  |
|     | addItem() |            |                  |
|     | buyItem() |            |                  |
|     | shiptItem() |            |                  |
|     | receiveItem() |            |                  |
|     | purchaseItem() |            |                  |
|     | fetchItemBufferOne() |            |                  |
|     | fetchItemBufferTwo() |            |                  |

## Part 4 : Deploy smart contracts on public test network

Once your smart contract is created, it’s time to go live! For this project, deploy your smart contract on the Ethereum RINKEBY test network.

* **Requirement 1**	Deploy smart contract on a public test network
* **Requirement 2**	Submit Transaction hash, contract hash, and contract address

### Requirement 1: Deploy smart contract on a public test network
Using Truffle framework, deploy your smart contract with the Rinkeby test network. Take note of your contract hash and address after successful deployment.

Tip: Refer to Infura screencast for assistance on deploying your smart contract with Infura and Truffle.


### Requirement 2: Submit Contract Address
Provide a document with your project submission that includes the contract address.

Document for your project must be in either ".txt" or ".md" format.

Hint: You can view the Contract address using a blockchain explorer (e.g. Etherscan).

Example of a random Contract address on the Rinkeby test network : https://rinkeby.etherscan.io/address/0xfb0720c0715e68f80c0c

## Part 5 : Modify client code to interact with smart contract

Create the frontend that allows your users to interact with your DApp. This should be a simple and clean frontend that manages product lifecycle as the product navigates down the supply chain.

Using javascript, create a single JS file with all web3 functions that allows your client code to interact with you smart contracts.

The coffee example in the boilerplate provides this code for you.


### Requirement: Configure client code for each actor
Front-end is configured to:

1) Submit a product for shipment (farmer to the distributor, distributor to retailer, etc).
2) Receive product from shipment.
3) Validate the authenticity of the product.
Frontend code can be downloaded and executed from a local environment.

# Optional : Implement infura to store product image

NOTE: This section is not required for your project to pass. These steps are purely optional and a way for you to expand on your project.

Using your previous coursework experience, modify your DApp to allow the initial producer in the supply chain to upload an image of the product along with the UPC hash and store this image using Infura.

Consider including 2 methods - upload() and read()