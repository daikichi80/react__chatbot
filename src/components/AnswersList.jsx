//インポート群
import React from 'react';
import { Answer } from './index'

//AnswersList関数コンポーネント定義

const AnswersList = (props) => {
  return (
    <div className="c-grid__answer">
      {props.answers.map((value, index) => { //ここのvalueは[{ content: "仕事を依頼したい", nextId: "job_offer" },{ content: "エンジニアのキャリアについて相談したい",nextId: "consultant" },{ content: "学習コミュニティについて知りたい", nextId: "community" },{ content: "お付き合いしたい", nextId: "dating" },],が入っている
        
        return <Answer content={value.content} nextId ={value.nextId} key={index.toString()} select={props.select}/>

      })}
    </div>
  );
};

export default AnswersList