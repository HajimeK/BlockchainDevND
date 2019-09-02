Multi-party consensus (多人数合意形成)

Multisig

Smart Contractのバグなどを攻撃されて、
コントラクトによるサービス提供を停止したい場合。
Blockchainの取引を止めることはできないことが、ダイレクトな金銭的な損失につながることになります

フラグでコントロールする

権限あるSmart Contractのオーナーがこのコントロールをコントロールしたい

ただ、これだと事故によりコントラクト自体がロックされて動かなくなる可能性がある。

そこで、複数のアカウントから許可された場合のみ、Smart Contractの動をを停止させたい。

これは、Smart Contractの動作停止だけでなく、
ある機能を提供する際に複数人の合意形成が必要な場合にも使える。
承認など合意形成が必要なプロセスで使えるのではないかと考えています。



M-of-N consensus


アカウントがトランザクション(暗号通貨の取引)やスマートコントラクト(ブロックチェーン上で実行可能なプログラム)の主体です。送金はあるアカウントから別のアカウントに対して行われ、スマートコントラクトは、スマートコントラクト

Bitcoinのようなブロックチェーンでは、複数署名(multisignaure)アカウントをサポートしています。この複数署名は略して"multisig"と呼ばれています。

このような複数署名を持つアカウント"multisig"は複数の秘密鍵を持っています。
の複数鍵の数がM-of-N consensusのNに相当します。

それではMが何かというと、あるトランザクションに必要なmultisigの秘密鍵のうちの個数を意味しています。

複数の署名が必要なので、一人悪い人がいてお金を盗ろうとしても、それを防ぐことができる
秘密鍵がなくなった場合の損害を防ぐことができる
会計的な取引のビジネスルール構築に使うことができる。つまりどういうことかというと

4. Smart multisignature escrow. Bitcoin allows multisignature transaction contracts where, for example, three out of a given five keys can spend the funds. Ethereum allows for more granularity; for example, four out of five can spend everything, three out of five can spend up to 10% per day, and two out of five can spend up to 0.5% per day. Additionally, Ethereum multisig is asynchronous - two parties can register their signatures on the blockchain at different times and the last signature will automatically send the transaction.

4.スマートなマルチ署名エスクロー。 ビットコインは、たとえば、特定の5つのキーのうち3つが資金を使用できるマルチ署名トランザクション契約を許可します。 イーサリアムでは、さらに細かく設定できます。 たとえば、5人のうち4人がすべてを費やし、5人のうち3人が1日あたり最大10％を費やし、5人のうち2人が1日あたり最大0.5％を費やすことができます。 さらに、Ethereum multisigは非同期です。2つのパーティが異なるタイミングでブロックチェーンに署名を登録でき、最後の署名がトランザクションを自動的に送信します。

では、実装例を見てみましょう。

3-of-5のmultisigアプリケーションを作ってみます。
この例ではTruffleを使います。
Truffle環境の作り方についてはこちらを参照してください。

3-of-5のmultisigアプリケーションでは、
５人の管理人中の３人が承認した場合のみ、取引が成立するようにします。
ここでは承認者の人数をカウンターで実装します。
一人の人が３回承認したことで、取引が成立することが内容に、
一度承認したことのある管理者からの二度目以降の承認については無視するようにします。
