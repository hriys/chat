const chat = [
    //返答
    'こんにちは。',
    'お名前は？',
    '良い名前ですね。',
    '趣味はなんですか？',
    'いい趣味ですね！',
    '休みの日は何しているんですか？',
    'そうなんですね。',
     //ランダム返答
    ['それじゃあね。', 'おっと。もうこんな時間。さようなら。', 'またね。']
];

//ロボットの返信の回数(最初は０回)
//自分が送信ボタンを押したときの相手の返答を配列から指定するのに利用
let chatCount = 0;

//画面に出力
//var=メッセージ内容、person=話しているのは誰か
function output(val, person) {
    //一番下までスクロールの記述
    const field = document.getElementById('field');

    const ul = document.getElementById('chat-ul');
    //Javaでli作る
    const li = document.createElement('li');
    //このdivにテキストを指定
    const div = document.createElement('div');
    div.textContent = val;

    if (person === 'me') { //自分のところ
        div.classList.add('chat-right');
        li.classList.add('right');
        ul.appendChild(li);
        li.appendChild(div);
        field.scroll(0, field.scrollHeight - field.clientHeight);
    } else if (person === 'robot') { //相手(ロボット)
        // ロボットが2個連続で返信してくる時、その間は返信不可にする。
        // 自分の返信を複数受け取ったことになり、その全てに返信してきてしまうから
        // 同じ返事を何個もしてしまうから。ロボットの連続返信は2個以内とする。
        chatBtn.disabled = true;
        setTimeout(() => {
            chatBtn.disabled = false;
            li.classList.add('left');
            div.classList.add('chat-left');
            ul.appendChild(li);
            li.appendChild(div);
            field.scroll(0, field.scrollHeight - field.clientHeight);

            //ロボットのトークの数に１を足す
            chatCount++;
        }, 2000);
    }
}

const chatBtn = document.getElementById('chat-button');
const inputText = document.getElementById('chat-input');

//送信ボタン押したときの処理
function btnFunc() {
    if (!inputText.value) return false;
    //自分のテキストを送信
    output(inputText.value, 'me');

    setTimeout(() => {
        // 入力内を空欄にする
        // 一瞬の間でvalueを取得し、ロボットの"Hi!〇〇!"の返信に利用
        // 送信ボタンを押した瞬間にvalueを消したら、やまびこに失敗した
        inputText.value = '';
    }, 1);

    //ロボットの送信回数に応じて次の返信を指定
    switch (chatCount) {
        // もしロボットのトーク数が2個の時に送信ボタンが押されたら、
        // 名前のやまびこと、chat配列の2（3個目）が返信
        case 2:
            output(inputText.value + ' !', 'robot');
            setTimeout(() => {
                output(chat[2], 'robot');
            }, 2000);
            setTimeout(() => {
                output(chat[3], 'robot');
            }, 3000);
            break;

        case 5:
            output(chat[4], 'robot');
            setTimeout(() => {
                output(chat[5], 'robot');
            }, 2000);
            break;

        case 7:
            output(chat[6], 'robot');
            break;


            // もしロボットのトーク数が4個の時に送信ボタンが押されたら、
            // chat配列の7（8個目）のランダム番目が返信
        case 8:
            output(chat[7][Math.floor(Math.random() * chat[7].length)], 'robot');
            break;

            //それ以降はやまびこ
        default:
            output(inputText.value, 'robot');
            break;
    }
}

//再初にロボットから２つ話しかけられる
output(chat[0], 'robot');

setTimeout(() => {
    output(chat[1], 'robot');
}, 2000);