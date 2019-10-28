
const Verifier = artifacts.require('Verifier');
const SolnSquareVerifier = artifacts.require('./SolnSquareVerifier');
const proof = require('../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {
    const account0 = accounts[0];
    const account1 = accounts[1];
    const name = "Name";
    const symbol = "Symbol";

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            verifier = await Verifier.new({ from: account0 });

            this.contract = await SolnSquareVerifier.deployed();
            // this.contract = await SolnSquareVerifier.new(
            //     verifier.address,
            //     name,
            //     symbol,
            //     { from: account0 });
            //console.log(verifier);
            //console.log(this.conract);
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
                        //console.log(result.logs[0].args);
                        console.log(result.logs[1].args);
                        //         emit Transfer(address(0), to, tokenId);
                        assert.equal(result.logs[1].args[0], address(0), "already owned");
                        assert.equal(result.logs[1].args[1], account1, "invalid account");
                        assert.equal(Number(result.logs[1]).args[2], INDEX, "invalid tokenId");
                    });
                console.log('here');
            } catch (e) {
                console.log(e);
            }

        });
    });
})