import React, { Component } from "react";
import WordDisplay from "./WordDisplay";
import Countdown from "./countdown";
import { Link } from "react-router-dom";
import axios from "axios";

class Gamer extends Component {
  state = {
    word: "",
    type: "",
    example: "",
    definition: "",
    userInput: "",
    go: false,
    playerstate: 2,
    error: "go on.."
  };
  componentDidMount() {
    // this.setState({
    //   //ace
    //   word: "ace",
    //   // word:res.data.results[0].lexicalEntries[0].text,

    //   //NOUN
    //   type: "noun",
    //   // type:res.data.results[0].lexicalEntries[0].lexicalCategory,

    //   example: "life had started dealing him aces again",
    //   // example:res.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text,

    //   definition: "this is a test"
    //   // "a playing card with a single spot on it, ranked as the highest card in its suit in most card games example"
    //   // definition:res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0],
    // });

    let words = [
      "pursuit",
      "knowledge",
      "warrior",
      "barbarian",
      "enunciate",
      "procrastinate",
      "analyze",
      "splice",
      "dice",
      "mice",
      "pandemonium",
      "nefarious",
      "notorious",
      "glorious",
      "fiddle",
      "suffering",
      "syntax",
      "anonymous",
      "socialist"
    ];

    let rand = words[Math.floor(Math.random() * words.length)];
    console.log(rand);

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${rand}`,
        {
          headers: {
            Accept: "application/json",
            app_id: "0296bd0a",
            app_key: "5a0766a941eb5287bafeab007dc348c8"
          }
        }
      )
      .then(res => {
        this.setState({
          //ace
          word: res.data.results[0].lexicalEntries[0].text,

          //NOUN
          // type: "noun",
          type: res.data.results[0].lexicalEntries[0].lexicalCategory,

          // example: "life had started dealing him aces again",
          example:
            res.data.results[0].lexicalEntries[0].entries[0].senses[0]
              .examples[0].text,

          // definition:
          //   "a playing card with a single spot on it, ranked as the highest card in its suit in most card games example"
          definition:
            res.data.results[0].lexicalEntries[0].entries[0].senses[0]
              .definitions[0]
        });
      });
  }
  handleChange = e => {
    this.setState({});
    // console.log('length',this.state.userInput.length);
    if (this.state.userInput.length === this.state.definition.length) {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
    // console.log(this.state.definition[this.state.userInput.length]);;
    // console.log('user',this.state.userInput[this.state.userInput.length-1])
    // console.log('def',this.state.definition[this.state.userInput.length-1])

    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        this.isEqual();
      }
    );
  };
  isEqual = () => {
    if (
      this.state.userInput[this.state.userInput.length - 1] ===
      this.state.definition[this.state.userInput.length - 1]
    ) {
      this.checkEqual();
      this.setState({
        error: "equal"
      });
    } else {
      this.setState({
        error: "not equal"
      });

      console.log("not");
    }
  };

  startButton = e => {
    this.setState({
      go: true
    });
  };
  checkEqual = () => {
    if (this.state.userInput === this.state.definition) {
      this.setState({
        playerState: 1
      });
    } else if (this.state.userInput !== this.state.definition) {
      this.setState({
        playerState: 0
      });
    } else {
      this.setState({
        playerState: 2
      });
    }
  };

  render() {
    if (!this.state.go) {
      return (
        <div className="App">
          <Link to="/" id="back">
            Back
          </Link>

          <Countdown
            startbutton={this.startButton}
            handleChange={this.handleChange}
            textLength={this.state.definition.length}
            playerState={this.state.playerstate}
            go={this.state.go}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Link to="/" id="back">
            Back
          </Link>

          <Countdown
            startbutton={this.startButton}
            handleChange={this.handleChange}
            textLength={this.state.definition.length}
            playerState={this.state.playerstate}
            go={this.state.go}
          />

          <h1 id="word">Word: {this.state.word}</h1>
          <p id="type">Lexical Category: {this.state.type}</p>
          <br />
          {this.state.go ? (
            <input
              id="userInput"
              autoComplete="off"
              onKeyDown={this.spaceCheck}
              onChange={this.handleChange}
              placeholder="Type the word definition here"
              value={this.state.userInput}
              type="text"
            />
          ) : (
            <h1>Press Start To begin</h1>
          )}
          <br />
          <button type="submit">Next Word</button>

          <h3>{this.state.error}</h3>
          <WordDisplay
            go={this.state.go}
            word={this.state.word}
            userInput={this.state.userInput}
            type={this.state.type}
            definition={this.state.definition}
            example={this.state.example}
          />
          {this.state.playerState === 1 ? (
            <h1>You have won</h1>
          ) : this.state.playerState === 0 ? null : (
            ""
          )}
        </div>
      );
    }
  }
}

export default Gamer;
