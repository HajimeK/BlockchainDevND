var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account0 = accounts[0];
    const account1 = accounts[1];

    const name = "You can name this contract as you please";
    //const symbol = "YCNTCAYP";
    const symbol = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    const TOTAL_SUPPLY = 5;

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await CustomERC721Token.new(
                name,
                symbol,
                { from: account0 });

            // TODO: mint multiple tokens
            for (let i = 0; i < TOTAL_SUPPLY; i++) {
                await this.contract.mint(account0, i, { from: account0 });
            }

        })

        it('should return total supply', async function () {
            let result = await this.contract.totalSupply();
            assert.equal(result, TOTAL_SUPPLY, "Total supply is not equal to TOTAL_SUPPLY");
        })

        it('should get token balance', async function () {
            let balance = await this.contract.balanceOf(account0);
            assert.equal(balance, TOTAL_SUPPLY, "Total supply is not equal to TOTAL_SUPPLY")
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let tokenURI = '';
            const expectedTokenURI = symbol + (TOTAL_SUPPLY-1);
            try {
                tokenURI = await this.contract.tokenURI(TOTAL_SUPPLY-1);
            } catch (e) {
                console.log(e);
            }
            assert.equal(tokenURI, expectedTokenURI, "Token URI is not the expected one");
        })

        it('should transfer token from one owner to another', async function () {
            await this.contract.transferFrom(account0, account1, TOTAL_SUPPLY-1);
            let balance1 = await this.contract.balanceOf(account0);
            let balance2  = await this.contract.balanceOf(account1);
            let currOwner = await this.contract.ownerOf(TOTAL_SUPPLY-1);
            assert.equal(currOwner, account1, "Not transfered");
            assert.equal(balance1, TOTAL_SUPPLY - 1, "Invalid Total Supply for 1");
            assert.equal(balance2, 1, "Account Two should be equal 1");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await CustomERC721Token.new(
                name,
                symbol,
                { from: account0 });

            // TODO: mint multiple tokens
            for (let i = 0; i < TOTAL_SUPPLY; i++) {
                await this.contract.mint(account0, i, { from: account0 });
            }
        })

        it('should fail when minting when address is not contract owner', async function () {
            let result = true;
            try {
                await this.contract.mint(account1, 1, {from: account1});
            } catch (e) {
                //console.log(e);
                result = false;
            }
            assert.isFalse(result, "should fail when minting when address is not contract owner");
        })

        it('should return contract owner', async function () {
            let contractOwner = await this.contract.owner();
            assert.equal(contractOwner, account0, "Invalid owner");

        })

    });
})