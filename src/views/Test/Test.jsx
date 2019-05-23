import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStoreToProps, mapDispatchToProps } from "./storeHelper";
import Timer from "../../components/Timer/Timer";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import Rules from "../../components/Rules/Rules";
import ScoreCounter from "../../components/ScoreCounter/ScoreCounter";
import { randomNumber } from "../../utils/numberUtils";
import { isEmpty } from "../../utils/arrayUtils";
import { conditionClass } from "../../utils/classUtils";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const QUESTIONS_NUMBER = 3;
export const TEST = "test";
const RULES =
  "A regra nesse modo de jogo é responder corretamente a maior quantidade de perguntas. Para vencer é necessário acertar pelo menos a metade dar perguntas.";

const Style = {
  test: "test",
  score: "test__score",
  button: "test__button",
  hidden: "test__hidden",
  animation: "animation-fade-in"
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: "",
      correct: "",
      answers: [],
      score: [],
      counter: 0,
      started: false,
      summary: false,
      category: "All",
      level: "1"
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeExpire = this.handleTimeExpire.bind(this);
    this.drawRandomQuestions = this.drawRandomQuestions.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { question, questions } = this.state;
    return questions !== nextProps.questions || question !== nextProps.question;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { questions } = nextProps;
    if (questions === this.props.questions) {
      return;
    }
    this.drawRandomQuestions(undefined, questions);
  }

  UNSAFE_componentWillMount() {
    this.drawRandomQuestions();
  }

  componentWillUnmount() {
    this.props.onTimerStop();
  }

  handleSaveWin = () => {
    this.setState({ started: false });
    const userLogged = JSON.parse(window.localStorage.getItem("userLogged"));
    if (userLogged && userLogged.id) {
      axios
        .get("http://localhost:8000/api/user/" + userLogged.id)
        .then(({ data }) => {
          console.log("data: ", data);
          // props.updateAppStatus(data)
          axios
            .post(`http://localhost:8000/api/leaderboard/${data.id}/update`, {
              wins: data.wins + 1
            })
            .then(({ data }) => {
              console.log("data: ", data);
              this.props.updateAppStatus(data);
            })
            .catch(error => {
              console.error("error at save win: ", error);
            });
        });
    }
  };

  handleAnswer(correct) {
    const { questions, question, score } = this.state;
    const { onTimerStart } = this.props;
    if (isEmpty(questions) && score) {
      if (correct) {
        return this.setState({ summary: true, score: [...score, 1] });
      }
      this.setState({ summary: true, score: [...score, 0] });
      return;
    }
    if (correct) {
      this.setState(
        prevState =>
          Object.assign(
            { score: [...score, 1], counter: ++prevState.counter },
            setItemsToRender(questions, question)
          ),
        onTimerStart
      );
    } else {
      this.setState(
        prevState =>
          Object.assign(
            { score: [...score, 0], counter: ++prevState.counter },
            setItemsToRender(questions, question)
          ),
        onTimerStart
      );
    }
  }

  handleRestart = () => {
    this.setState({ questions: [], score: [], started: false, summary: false });
  }

  handleStart() {
    const { question } = this.state;
    const questions = this.props.questions[this.state.category];

    const { onTimerStart } = this.props;
    this.setState(
      Object.assign({ started: true }, setItemsToRender(questions, question)),
      onTimerStart
    );
  }

  handleTimeExpire() {
    const { question, score } = this.state;
    const { questions } = this.props;
    const { onTimerStart } = this.props;
    this.setState(
      prevState =>
        Object.assign(
          { score: [...score, 0], counter: ++prevState.counter },
          setItemsToRender(questions, question)
        ),
      onTimerStart
    );
  }

  handleChange({ target }) {
    const { name, value } = target;
    if (name === "category") {
      this.setState({ [name]: value });
      this.drawRandomQuestions(value);
    } else {
      this.setState({ [name]: value });
    }
  }

  drawRandomQuestions(category = "All", data) {
    const questions = data || this.props.questions;
    if (isEmpty(questions.All)) {
      return;
    }
    const randomQuestions = [];
    let i = randomQuestions.length;
    while (i < QUESTIONS_NUMBER) {
      const question =
        questions[category][randomNumber(questions[category].length)];
      if (!randomQuestions.includes(question)) {
        randomQuestions.push(question);
      }
      i++;
    }
    this.setState({ questions: randomQuestions });
  }

  render() {
    const {
      question,
      answers,
      correct,
      started,
      score,
      counter,
      summary,
      level
    } = this.state;
    const { timer, onTimerStop } = this.props;
    if (summary) {
      if (score.length === 3 && started) {
        this.handleSaveWin();
      }
      return (
        <div style={{ textAlign: "center" }}>
          <span className={Style.score}>
            Seu Resultado: {score.filter(item => item === 1).length} /{" "}
            {QUESTIONS_NUMBER}
            <br />
            {score.filter(item => item === 1).length >= QUESTIONS_NUMBER - 1 ? (
              <span>Você ganhou</span>
            ) : (
              <span>Você perdeu</span>
            )}
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20%"
            }}
          >
            <Link className={Style.button} to="/">
              Ver ranking de vitórias
            </Link>
            {/* <Button
              className={Style.button}
              onClick={() => this.handleRestart}
              text="Jogar novamente"
            /> */}
          </div>
        </div>
      );
    }
    return (
      <div className={Style.test}>
        <Rules
          started={started}
          rules={RULES}
          mode={TEST}
          onClick={this.handleStart}
          onChange={this.handleChange}
        />
        <div className={conditionClass(started, Style.animation, Style.hidden)}>
          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ width: 150, height: 100, borderRadius: 12, background: "#191919", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div style={{ width: 50, height: 50, borderRadius: "100%", background: "#fff", color: "#191919", fontSize: 25, marginBottom: 5, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                <span>NR</span>
              </div>
              <p>1 acerto(s)</p>
            </div>
            <span style={{ margin: "0 10px", display: "inline-block" }}> X </span>
            <div style={{ width: 150, height: 100, borderRadius: 12, background: "#191919", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div style={{ width: 50, height: 50, borderRadius: "100%", background: "#fff", color: "#191919", fontSize: 25, marginBottom: 5, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                <span>P2</span>
              </div>
              <p>3 acerto(s)</p>
            </div>
          </div> */}
          <ScoreCounter
            started={started}
            counter={counter}
            max={QUESTIONS_NUMBER}
            score={score}
            mode={TEST}
          />
          <QuestionBox
            started={started}
            question={question}
            answers={answers}
            correct={correct}
            mode={TEST}
            timer={timer}
            onTimerStop={onTimerStop}
            onAnswer={this.handleAnswer}
            onTimeExpire={this.handleTimeExpire}
          />
          <Timer time={switchLevelToTime(level)} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Test);

Test.defaultProps = {
  questions: []
};

Test.propTypes = {
  /** */
  questions: PropTypes.object,
  /** */
  question: PropTypes.object,
  /** */
  timer: PropTypes.bool,
  /** */
  onTimerStart: PropTypes.func,
  /** */
  onTimerStop: PropTypes.func
};

const setItemsToRender = (questions, question) => {
  console.log("questions: ", questions);
  const itemToRender = questions.filter(item => item.question !== question)[
    randomNumber(questions.length - 1)
  ];
  const newQuestions = questions
    .filter(item => item.question !== itemToRender.question)
    .slice(0, 2);
  return {
    question: itemToRender.question,
    answers: itemToRender.answers,
    correct: itemToRender.correct,
    questions: newQuestions
  };
};

const switchLevelToTime = level => {
  switch (level) {
    case "1":
      return 15000;
    case "2":
      return 10000;
    case "3":
      return 5000;
  }
};
