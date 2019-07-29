const secrets = require('./secrets');

module.exports = {
  // default applies to all environments
  default: {
    // Blockchain node to deploy the contracts
    deployment: {
      host: "localhost", // Host of the blockchain node
      port: 8546, // Port of the blockchain node
      type: "ws" // Type of connection (ws or rpc),
      // Accounts to use instead of the default account to populate your wallet
      // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
      /*,accounts: [
        {
          privateKey: "your_private_key",
          balance: "5 ether"  // You can set the balance of the account in the dev environment
                              // Balances are in Wei, but you can specify the unit with its name
        },
        {
          privateKeyFile: "path/to/file", // Either a keystore or a list of keys, separated by , or ;
          password: "passwordForTheKeystore" // Needed to decrypt the keystore file
        },
        {
          mnemonic: "12 word mnemonic",
          addressIndex: "0", // Optional. The index to start getting the address
          numAddresses: "1", // Optional. The number of addresses to get
          hdpath: "m/44'/60'/0'/0/" // Optional. HD derivation path
        },
        {
          "nodeAccounts": true // Uses the Ethereum node's accounts
        }
      ]*/
    },
    // order of connections the dapp should connect to
    dappConnection: [
      "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
      "https://mainnet.infura.io/v3/39e6d52668b54096874f6555b2123cff" //to connect and fetch data if metamask isn't installed
      //"ws://localhost:8546",
      //"http://localhost:8545"
    ],

    // Automatically call `ethereum.enable` if true.
    // If false, the following code must run before sending any transaction: `await EmbarkJS.enableEthereum();`
    // Default value is true.
    dappAutoEnable: true,

    gas: "auto",

    // Strategy for the deployment of the contracts:
    // - implicit will try to deploy all the contracts located inside the contracts directory
    //            or the directory configured for the location of the contracts. This is default one
    //            when not specified
    // - explicit will only attempt to deploy the contracts that are explicitly specified inside the
    //            contracts section.
    strategy: 'explicit',
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    accounts: [
       {
        privateKey: secrets.privateKey,
        balance: "50 ether"
       }
    ],

    contracts: {
      luv_token: {
        
      },
      luv_crowdsale: {
        args: [1e6, '$accounts[0]', '$luv_token', 1566259200, 1577836800] //1566259200|1577836800 -> August 20th 2019 GMT to Jan 1st 20200 GMT
      }
    }
  },

  mainnet: {
    deployment:{
      accounts: [
        {
          privateKey: secrets.privateKey
        }
      ],
      host: "mainnet.infura.io/v3/39e6d52668b54096874f6555b2123cff",
      port: false,
      protocol: 'https',
      type: "rpc"
    },
    
    contracts: {
      luv_token: {
        //from: '$accounts[0]'
      },
      luv_crowdsale: {
        //from: '$accounts[0]',
        args: [1e6, '0xB6A7408864e1Fa44a330218d9F716016f58b5b5f', '$luv_token', 1566259200, 1577836800] //1566259200|1577836800 -> August 20th 2019 GMT to Jan 1st 2020 GMT
      }
    }
  },

};
