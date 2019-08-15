What zk-SARKdo is allow you to verify with cryptographic certainty that someone else has computed a value 
and that they've done it by a process which you can verify all without having to witness the actual computation.

zk-SNARKを用いることで、
誰かが計算によって値を求めた際に、
その計算過程が妥当であることを、実際の計算を監視することなしに暗号理論に則って検証することができます。

A common use case for this is to ensure that someone else has some certain data, like a secret, but without them having to reveal what the data is.

具体例としては、だれかが秘密とする何某かのデータを持っていて、
それを開示しない場合が考えられます。

Aliceは、Bobがあるドキュメントを持っているか知りたいものとします。
Aliceは、Aliceの持つドキュメントのハッシュ値をBobに送りつけます。
Bobは、このハッシュ値がマッチすると返事したものとします。
しかし、この場合、Aliceは実際にはBobがマッチすると確認したといっても、
実際にドキュメントを持っているのか、ただ単に持っていると返事したのか本当のところを知ることはできません。

こうしたときに使用できるのがzk-SNARKSです。

Aliceは”Cryptographic Circuit"というものを生成します。
これは基本的にはzk-SNARKのエンジンとなり、
ちょとしたコンピュータープログラムとして振る舞います。

このコンピュータープログラムは２つの入力をとります。
Aliceが提供したハッシュ値と、Bobが引用したドキュメントです。
”Cryptographic Circuit"はBobのドキュメントのハッシュ値を求め、Aliceの提供したハッシュ値と比較します。
一致していた場合は真を、一致しなかった場合は偽を返します。

このプログラムはBobのコンピュータで実行されます。
Bobにとっては、情報の開示が懸念され、
プログラムの実行結果が出力されたことで、プログラムが実行されたことの証明となります。

Bobがプログラムを変更したり、誤ったドキュメントを入力したり、
送信中に汚染されたデータを隠そうとすると、
Aliceが受け入れるようなデータを生成することができなくなります。

別の言い方をすると、
AliceはBobがプログラムを成功裏に実行したかとうかを確実にすることができ、
Bobが実際に該当するドキュメントを持っていることを知ることができます。
一方でBobは、Aliceに対しドキュメントを開示せずに、
ドキュメントを持っていることを証明できるので、
プライバシーを保つことができます。


zk - Zero Knowledge
S - Succinct : 証明にかかる
N - Non-Interactive
AR - Argument
K - of Knowledge
