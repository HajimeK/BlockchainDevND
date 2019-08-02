The couse materials need to be corrected to adapt to web3 1.0.0
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
RemixContract = new web3.eth.Contract(

Truffle Installation, Ubuntu 18.04LTS
>sudo npm install -g truffle -unsafe-perm


Solidity
0.4.24 -> 0.5.10
string -> string memory

Smart Contract
Blockchainへの参加者のノード上で実さされるコード。
送金、受取、資産の移転、その他メッセージのやりとりなどが行える。

実行されると、Blockchainのブロックとして記録される。
つまり、分散環境で匿名性を保ったまま、なにかしらの処理が可能ということを意味する。
IoTなどであれば、設定の変更や、コマンドの送信を行えるということ
ノードをフレキシブルに組み立てても、情報の交換が行えることを意味するので、
固定ネットワークへのノードの配置が難しいアプリケーションなどでも、
IoT機器をネットワークに参加させることで、コマンドや情報のやり取りができるということ。

ストリーム処理のような、リアルタイム、ビッグデータ環境では帯域幅が広く、
処理能力の高いクラウドサーバーを用いて、
それ以外の設定やコマンド、アラートなどはBlockchainで行う
ハイブリッド型にすれば、即IoTの世界で実用が可能であると考えている

買手が、Smart Contractに送金し、Smart Contract
は、売手が処品を発送して買手が受領を確認してから、
送金されたEtherを売手に渡す。

