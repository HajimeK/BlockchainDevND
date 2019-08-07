const Lemonade = artifacts.require("Lemonade");

contract("Lemonade", async() => {
  it("Added items can be seen as a ForSale Item", async () => {
    let instance = await Lemonade.deployed();
    let user = accounts[1];
    let itemName = "Car";
    let itemPrice = 100;
    // 2. use the transferStar function implemented in the Smart Contract
    await instance.addItem(itemName, itemPrice, {from: user});
    // 3. Verify the star owner changed.
    assert.equal(await instance.fetchItem.call(1).name, name);
  });

});