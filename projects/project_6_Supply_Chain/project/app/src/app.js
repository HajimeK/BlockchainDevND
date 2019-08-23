App = {
  web3Provider: null,
  contracts: {},
  emptyAddress: '0x0000000000000000000000000000000000000000',
  sku: 0,
  upc: 0,
  metamaskAccountID: '0x0000000000000000000000000000000000000000',
  ownerID: '0x0000000000000000000000000000000000000000',
  originFarmerID: '0x0000000000000000000000000000000000000000',
  originFarmName: null,
  originFarmInformation: null,
  originFarmLatitude: null,
  originFarmLongitude: null,
  productNotes: null,
  productPrice: 0,
  distributorID: '0x0000000000000000000000000000000000000000',
  retailerID: '0x0000000000000000000000000000000000000000',
  consumerID: '0x0000000000000000000000000000000000000000',

  init: async function () {
    App.readForm()
    /// Setup access to blockchain
    return await App.initWeb3()
  },

  readForm: function () {
    App.sku = $('#sku').val()
    App.upc = $('#upc').val()
    App.ownerID = $('#ownerID').val()
    App.originFarmerID = $('#originFarmerID').val()
    App.originFarmName = $('#originFarmName').val()
    App.originFarmInformation = $('#originFarmInformation').val()
    App.originFarmLatitude = $('#originFarmLatitude').val()
    App.originFarmLongitude = $('#originFarmLongitude').val()
    App.productNotes = $('#productNotes').val()
    App.productPrice = $('#productPrice').val()
    App.distributorID = $('#distributorID').val()
    App.retailerID = $('#retailerID').val()
    App.consumerID = $('#consumerID').val()
  },

  initWeb3: async function () {
    /// Find or Inject Web3 Provider
    /// Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum
      try {
        // Request account access
        await window.ethereum.enable()
      } catch (error) {
        // User denied account access...
        console.error('User denied account access')
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:8545'
      )
    }

    App.getMetaskAccountID()

    return App.initSupplyChain()
  },

  getMetaskAccountID: function () {
    web3 = new Web3(App.web3Provider)

    // Retrieving accounts
    web3.eth.getAccounts(function (err, res) {
      if (err) {
        console.log('Error:', err)
        return
      }
      App.metamaskAccountID = res[0]
    })
  },

  initSupplyChain: function () {
    /// Source the truffle compiled smart contracts
    var jsonSupplyChain = '../../build/contracts/SupplyChain.json'

    /// JSONfy the smart contracts
    $.getJSON(jsonSupplyChain, function (data) {
      var SupplyChainArtifact = data
      App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact)
      App.contracts.SupplyChain.setProvider(App.web3Provider)
      App.fetchEvents()
    })

    return App.bindEvents()
  },

  bindEvents: function () {
    $(document).on('click', App.handleButtonClick)
  },
  getState: function (stateID) {
    switch (stateID) {
      case '0':
        return 'Harvested'
      case '1':
        return 'Processed'
      case '2':
        return 'Packed'
      case '3':
        return 'ForSale'
      case '4':
        return 'Bought'
      case '5':
        return 'Ship'
      case '6':
        return 'Received'
      case '7':
        return 'Purchased'
    }
  },
  handleButtonClick: async function (event) {
    event.preventDefault()

    App.getMetaskAccountID()

    var processId = parseInt($(event.target).data('id'))

    switch (processId) {
      case 1:
        return await App.harvestItem(event)
        break
      case 2:
        return await App.processItem(event)
        break
      case 3:
        return await App.packItem(event)
        break
      case 4:
        return await App.sellItem(event)
        break
      case 5:
        return await App.buyItem(event)
        break
      case 6:
        return await App.shipItem(event)
        break
      case 7:
        return await App.receiveItem(event)
        break
      case 8:
        return await App.purchaseItem(event)
        break
      case 9:
        return await App.fetchItemBufferOne(event)
        break
      case 10:
        return await App.fetchItemBufferTwo(event)
        break
      case 11:
        return await App.addFarmer(event)
        break
      case 12:
        return await App.addDistributor(event)
        break
      case 13:
        return await App.addRetailer(event)
        break
      case 14:
        return await App.addConsumer(event)
        break
    }
  },

  harvestItem: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    App.upc = $('#upc-farm').val()
    const originFarmID = $('#originFarmerID').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.harvestItem(
          App.upc,
          originFarmID,
          App.originFarmName,
          App.originFarmInformation,
          App.originFarmLatitude,
          App.originFarmLongitude,
          App.productNotes
        )
      })
      .then(function (result) {
        $('#ftc-farm-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  processItem: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    App.upc = $('#upc-farm').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.processItem(App.upc, { from: App.metamaskAccountID })
      })
      .then(function (result) {
        $('#ftc-farm-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  packItem: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    App.upc = $('#upc-farm').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.packItem(App.upc, { from: App.metamaskAccountID })
      })
      .then(function (result) {
        $('#ftc-farm-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  sellItem: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    App.upc = $('#upc-farm').val()
    App.productPrice = web3.toWei($('#sellingPrice').val(), 'ether')
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.sellItem(App.upc, App.productPrice, {
          from: App.metamaskAccountID
        })
      })
      .then(function (result) {
        $('#ftc-farm-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  buyItem: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    App.upc = $('#upc-product').val()
    const buyingPrice = $('#productPrice').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        const walletValue = web3.toWei(buyingPrice, 'ether')
        return instance.buyItem(App.upc, {
          from: App.metamaskAccountID,
          value: walletValue
        })
      })
      .then(function (result) {
        $('#ftc-product-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  shipItem: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    App.upc = $('#upc-product').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.shipItem(App.upc, { from: App.metamaskAccountID })
      })
      .then(function (result) {
        $('#ftc-product-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  receiveItem: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    App.upc = $('#upc-product').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.receiveItem(App.upc, { from: App.metamaskAccountID })
      })
      .then(function (result) {
        $('#ftc-product-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  purchaseItem: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    App.upc = $('#upc-product').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.purchaseItem(App.upc, { from: App.metamaskAccountID })
      })
      .then(function (result) {
        $('#ftc-product-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
    App.upc = $('#upc').val()

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.fetchItemBufferOne(App.upc)
      })
      .then(function (result) {
        $('#ftc-item').text(
          'SKU ' +
            result[0] +
            ' - UPC ' +
            result[1] +
            ' - OwnerID ' +
            result[2] +
            ' - FarmerID ' +
            result[3]
        )
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
    App.upc = $('#upc').val()

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.fetchItemBufferTwo.call(App.upc)
      })
      .then(function (result) {
        $('#ftc-item').text(
          'SKU ' +
            result[0] +
            ' - UPC ' +
            result[1] +
            ' - ProductID ' +
            result[2] +
            ' - ProductPrice ' +
            result[4] +
            ' - ItemState ' +
            App.getState('' + result[5] + '') +
            ' - DistributorID ' +
            result[6] +
            ' - RetailerID ' +
            result[7] +
            ' - ConsumerID ' +
            result[8]
        )
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },
  addFarmer: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    const userID = $('#userID').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.addFarmer(userID, { from: App.metamaskAccountID })
      })
      .then(function (result) {
        $('#ftc-user-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },
  addDistributor: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    const userID = $('#userID').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.addDistributor(userID, { from: App.metamaskAccountID })
      })
      .then(function (result) {
        $('#ftc-user-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },
  addRetailer: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    const userID = $('#userID').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.addRetailer(userID, { from: App.metamaskAccountID })
      })
      .then(function (result) {
        $('#ftc-user-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },
  addConsumer: function (event) {
    event.preventDefault()
    var processId = parseInt($(event.target).data('id'))
    const userID = $('#userID').val()
    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        return instance.addConsumer(userID, { from: App.metamaskAccountID })
      })
      .then(function (result) {
        $('#ftc-user-item').text(result.logs[0].transactionHash)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  },

  fetchEvents: function () {
    if (
      typeof App.contracts.SupplyChain.currentProvider.sendAsync !== 'function'
    ) {
      App.contracts.SupplyChain.currentProvider.sendAsync = function () {
        return App.contracts.SupplyChain.currentProvider.send.apply(
          App.contracts.SupplyChain.currentProvider,
          arguments
        )
      }
    }

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        var events = instance.allEvents(function (err, log) {
          if (!err) {
            $('#ftc-events').append(
              '<li>' + log.event + ' - ' + log.transactionHash + '</li>'
            )
          }
        })
      })
      .catch(function (err) {
        console.log(err.message)
      })
  }
}

$(function () {
  $(window).load(function () {
    App.init()
  })
})
