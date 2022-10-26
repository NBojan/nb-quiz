import { useGlobalContext } from "./context";
import Loading from "./Loading";
import Modal from "./Modal";
import QuizForm from "./QuizForm";

function App() {
  const {showForm, loading, questions, index, correct, nextQuestion, checkCorrect} = useGlobalContext();
  
  if(showForm){
    return <QuizForm />
  }
  if(loading){
    return <Loading />
  }
  const {question, correct_answer, incorrect_answers} = questions[index];
  let answers = [...incorrect_answers];
  const randomNr = Math.floor(Math.random() * 4);
  if(randomNr === 3){
    answers.push(correct_answer);
  } else {
    answers.push(answers[randomNr]);
    answers[randomNr] = correct_answer;
  }

  return (
    <section className="questions containerBoot m-auto centerFlex">
      <Modal />

      <div className="questionCard p64">
        <div className="d-flex justify-end correctAns ls-15">Correct Answers: {correct}/{index}</div>
        <div className="question mTB-32">
          <h2 className="ta-center mb-32" dangerouslySetInnerHTML={{__html: `${index+1}. ${question}`}}/>
          <div className="answers">
            {answers.map((answer, index) => (
              <button key={index} dangerouslySetInnerHTML={{__html: answer}} className="btn btn-m" onClick={() => checkCorrect(answer === correct_answer)}/>
            ))}
          </div>
        </div>

        <div className="d-flex justify-end">
          <button className="btn btn-m btn-warning fw-600 skipBtn" onClick={nextQuestion}>Skip Question</button>
        </div>
      </div>
      
    </section>
  );
}

export default App;
