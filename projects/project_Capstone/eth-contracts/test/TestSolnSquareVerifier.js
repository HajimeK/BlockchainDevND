const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof = require('../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {
    const account0 = accounts[0];
    const account1 = accounts[1];
    const name = "Name";
    const symbol = "Symbol";
    let contract;

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await SolnSquareVerifier.new(
                account0,
                name,
                symbol,
                { from: account0 });
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () {
            const KEY = account1;
            const INDEX = 1;
            try {
                await this.contract.addSolution(account1, INDEX, account1).then((result) => {
                    //console.log(result.logs[0].args);
                    assert.equal(result.logs[0].event, "evSolutionAdded", "Not an expected event");
                    assert.equal(Number(result.logs[0].args[0]), INDEX, "Not registered properly");
                    assert.equal(Number(result.logs[0].args[1]), account1, "Not registered properly");
                });
            } catch (e) {
                console.log(e);
            }
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function () {
            const KEY = account1;
            const INDEX = 10;

            try {
                await this.contract.mintToken(
                    INDEX,
                    account1,
                    ...Object.values(proof.proof),
                    proof.inputs,
                    { from: account0 }).then((result) => {
                        console.log(result);
                        //         emit Transfer(address(0), to, tokenId);
                        assert.equal(result.logs[0].args[0], 0, "already owned");
                        assert.equal(result.logs[0].args[1], account1, "invalid account");
                        assert.equal(Number(result.logs[0]).args[2], INDEX, "invalid tokenId");
                    });
            } catch (e) {
                console.log(e);
            }

        });
    });
})