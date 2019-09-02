SolidityのFallbackファンクションについて説しします。

以下を参照しました。
https://solidity.readthedocs.io/en/v0.5.11/contracts.html?highlight=fallback#functions

Fallbackファンクションは、呼び出しに該当するファンクションが無い場合などに呼ばれます。
外部からの可視性としてexternalが指定されるものの、外部とやりとりする引数や戻り値はありません。
コントラクトはこのFallbackファンクションというのを、ただ1つだけ提供することができます。

コントラクトが、データが追記されていないEtherを受け取った場合に呼ばれます。
Etherを受け取り、コントラクトの収支に加えるにあたり、Fallback関数は"payable"である必要があります。
"payable"でないと、コントラクトは通常のトランザクションではEtherを受け取れず、例外を投げることになります。

最悪の場合に備え、簡単なログ等を記録できるよう、2300のgasの使用制限があります。なので、以下の操作は2300gas以上を使用するのでFallback関数では行なえません。

storageへの書き込み
contract生成
大量のgasを消費するexternal関数の呼び出し
Etherの送金
Like any function, the fallback function can execute complex operations as long as there is enough gas passed on to it.

参ししたドキュメントには、以下の注意書きがあります。

Fallback関数は、呼び出した関数が利用可能で無い場合、つまり呼ばれない場合にも呼び出される。
Etherを受け取るだけのためにFallback関数を実装する場合、上記のような場合をチェックするためにも、
require(msg.data.length == 0)
などの処理を加えたほうがよい。

Warning

SendやTransferにより、関数呼び出しでなく、Etherを直接受け取るようなContractを実装して、
そのFallback関数が例外を投げないようにする場合、Etherを返金することになる。
この点はSolitity v0.4.0からの変更点となる。
この場合、Fallback関数はpayableな関数にする必要がある。

payableなFallback関数を持たないコントラクトは、コインベーストランザクション（マイナーブロック報酬）の受信者、またはselfdestructの宛先としてEtherを受け取れる。
Note

Fallback関数は引数を設定できないものの、msg.dataから呼び出し時のペイロードにアクセスできます。
address(this).balance
の値がコントラクトで実装者が設定したsum of some manual accounting implemented in a contract (i.e. having a counter updated in the fallback function).

pragma solidity >=0.5.0 <0.7.0;

contract Test {
    // This function is called for all messages sent to
    // this contract (there is no other function).
    // Sending Ether to this contract will cause an exception,
    // because the fallback function does not have the `payable`
    // modifier.
    function() external { x = 1; }
    uint x;
}


// This contract keeps all Ether sent to it with no way
// to get it back.
contract Sink {
    function() external payable { }
}

contract Caller {
    function callTest(Test test) public returns (bool) {
        (bool success,) = address(test).call(abi.encodeWithSignature("nonExistingFunction()"));
        require(success);
        // results in test.x becoming == 1.

        // address(test) will not allow to call ``send`` directly, since ``test`` has no payable
        // fallback function. It has to be converted to the ``address payable`` type via an
        // intermediate conversion to ``uint160`` to even allow calling ``send`` on it.
        address payable testPayable = address(uint160(address(test)));

        // If someone sends ether to that contract,
        // the transfer will fail, i.e. this returns false here.
        return testPayable.send(2 ether);
    }
}
Function Overloading