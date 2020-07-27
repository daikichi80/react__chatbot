//インポート
import React from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css';
import { AnswersList , Chats } from './components/index';


//Appクラスコンポーネント
export default class App extends React.Component {
  //データセットを初期化
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: defaultDataset,//defaultDatasetはdataset.jsから読み込んでる
      open:false
    }
    this.selectAnswer = this.selectAnswer.bind(this);
  }//end クラスコンポーネント

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text:this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId : nextQuestionId
    })
  }


  

  selectAnswer = (selectedAnswer,nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        setTimeout(()=>this.displayNextQuestion(nextQuestionId),500);
        break;
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = 'blank'
        a.click();
        break
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: 'answer'
        });

        this.setState({
          chats: chats
        });

        setTimeout(() => this.displayNextQuestion(nextQuestionId),1000);
        break;
      
    }
  }
// Answers
//initAnswer関数を定義
  // initAnswer = () => {
  //   const initDataset = this.state.dataset[this.state.currentId];
  //   //ここにはdatasetの中のcurrentIdの連想配列が取得される初期状態なのでinit: {answers: [{ content: "仕事を依頼したい", nextId: "job_offer" },{content: "エンジニアのキャリアについて相談したい",nextId: "consultant",},{ content: "学習コミュニティについて知りたい", nextId: "community" },{ content: "お付き合いしたい", nextId: "dating" },],question: "こんにちは！🐯トラハックへのご用件はなんでしょうか？",},が入ってくる

  //   const initAnswers = initDataset.answers
  //   //currentIdがinitのdatasetのanswersが入る(question:を除外している)


  //   //answersをinitAnswersにstateを書き換える処理
  //   this.setState({
  //     answers: initAnswers
  //   });
  // };

//Chats
  initChats = () => {
    const initDataset = this.state.dataset[this.state.currentId];

    const chat = {
      text:initDataset.question,
      type:'question'
    }

    const chats = this.state.chats;
    chats.push(chat);

    //answersをinitAnswersにstateを書き換える処理
    this.setState({
      chats: chats
    });
  };

//コンポーネントが読み込まれてレンダーされた後initAnswer関数を実行（つまり初期化している）
  componentDidMount() {
    const initAnswer = '';
    this.selectAnswer(initAnswer, this.state.currentId);
  };


  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area') ;
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }
//レンダーメソッド（こいつが走った後にcomponentDidMountが走る。そこでsetStateしているので再度renderが走る。これで画面が書き換わる。componentDidMountは一度だけしか実行されない
  render() {
    return (
      //大枠のラップ
      <section className="c-section">
        <div className="c-box">
          {/*chatsコンポーネン呼び出しと同時にchatsというpropsを渡す*/}
          <Chats chats={this.state.chats}/>
          {/* AnswersListコンポーネント呼び出しと同時にanswersというpropsを渡す*/}
          <AnswersList answers={this.state.answers} select={this.selectAnswer}/>
        </div>
      </section>
    );
  };
};

