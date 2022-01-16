import React, { Component } from 'react';
import firebase from 'firebase';
//import uuid from 'uuid';

//var firebase = require('firebase');
var uuid = require('uuid');
console.log("................"+uuid)
const firebaseConfig = {
    apiKey: "AIzaSyDyRkXFuA7CAbUgR2J-z-liQREODgS8cqs",
    authDomain: "hobbysurvey.firebaseapp.com",
    databaseURL: "https://hobbysurvey-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hobbysurvey",
    storageBucket: "hobbysurvey.appspot.com",
    messagingSenderId: "922896113934",
    appId: "1:922896113934:web:61f6e9d2c0d3ec52e5f75f",
    measurementId: "G-75TXLR7CEB"
  };
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 

class HobbySurvey extends Component{

    personNameSubmit(event){
        var name = this.refs.name.value;
        this.setState({personName:name}, function(){
            console.log(this.state)
        })
    };

    surveySubmit(event){
        this.state({isSubmitted:true});
        firebase.database.ref('hobbysurvey/'+this.state.uid).set({
            personName:this.state.personName,
            answers:this.state.answers,
        });
        console.log('submitted');
        
    };

    answerSelected(event){
        var answers = this.state.answers;

        if(event.target.name === 'ans1'){
            answers.ans1=event.target.value;
        }
        else if(event.target.name === 'ans2'){
            answers.ans2=event.target.value;
        }
        else if(event.target.name === 'ans3'){
            answers.ans3=event.target.value;
        }
        else if(event.target.name === 'ans4'){
            answers.ans4=event.target.value;
        }

        this.setState({answers:answers}, function(){
            console.log(this.state);
        })
    };

    constructor(props){
        super(props);

        this.state = {
            uid: uuid.v1(),
            personName:'',
            answers: {
                ans1:'',
                ans2:'',
                ans3:'',
                ans4:'',
            },
            isSubmitted : false
        };
        this.personNameSubmit=this.personNameSubmit.bind(this)
        this.surveySubmit = this.surveySubmit.bind(this)
        this.answerSelected = this.answerSelected.bind(this)
    }
    render(){
        var name = '';
        var questions = '';

        if(this.state.personName === '' && this.state.isSubmitted === false){
            name = <div>
                <h3> Hey! Please enter your name</h3>
                <form onSubmit={this.personNameSubmit}>
                    <input className="sName" type="text" placeholder="Please enter your name" ref="name"/>
                </form>
            </div>
        }
        else if(this.state.personName !== '' && this.state.isSubmitted === false){
            name = <div>
                <h3> {this.state.personName}! Let's start the survey</h3>
            </div>;
            questions=<div>
                Please answer the following
                <form onSubmit={this.surveySubmit}>
                    <div className='card'>
                        <label>Choose your favorite movie</label><br/>
                        <input type="radio" name="ans1" value="Iron Man" onChange={this.answerSelected}/>Iron Man
                        <input type="radio" name="ans1" value="Thor" onChange={this.answerSelected}/>Thor
                        <input type="radio" name="ans1" value="Hulk" onChange={this.answerSelected}/>Hulk
                        <input type="radio" name="ans1" value="Spiderman" onChange={this.answerSelected}/>Spiderman
                    </div>

                    <div className='card'>
                        <label>Choose your favorite Sport</label><br/>
                        <input type="radio" name="ans2" value="Football" onChange={this.answerSelected}/>Football
                        <input type="radio" name="ans2" value="Cricket" onChange={this.answerSelected}/>Cricket
                        <input type="radio" name="ans2" value="F1" onChange={this.answerSelected}/>F1
                        <input type="radio" name="ans2" value="Tennis" onChange={this.answerSelected}/>Tennis
                    </div>

                    <div className='card'>
                        <label>Choose your favorite Dessert</label><br/>
                        <input type="radio" name="ans3" value="Cake" onChange={this.answerSelected}/>Cake
                        <input type="radio" name="ans3" value="Pudding" onChange={this.answerSelected}/>Pudding
                        <input type="radio" name="ans3" value="IceCream" onChange={this.answerSelected}/>IceCream
                        <input type="radio" name="ans3" value="Chocolate" onChange={this.answerSelected}/>Chocolate
                    </div>

                    <div className='card'>
                        <label>Choose your favorite Hobby</label><br/>
                        <input type="radio" name="ans4" value="Reading" onChange={this.answerSelected}/>Reading
                        <input type="radio" name="ans4" value="Sleeping" onChange={this.answerSelected}/>Sleeping
                        <input type="radio" name="ans4" value="Eating" onChange={this.answerSelected}/>Eating
                        <input type="radio" name="ans4" value="Exercising" onChange={this.answerSelected}/>Exercising
                    </div>
                    <input className="feedback-button" type="submit" value="submit"/>

                </form>

            </div>
        }
        else if(this.state.personName !== '' && this.state.isSubmitted === true){
            name = <div>
                <h1>Thanks for submitting the Survey!</h1>
            </div>
        }

        return(
            <div>
                {name}
                <hr />
                {questions}
            </div>
        );
    }
}

export default HobbySurvey;