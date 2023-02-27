import React, { useEffect, useState}from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  useEffect(() => {
    if(timeRemaining === 0){
      setTimeRemaining(10); 
      onAnswered(false);
      return; //this will exit the useEffect function early--
      //??How do I know this is the right option??
    }
  

    // set a timeout to run after 1 second 
    const timerId = setTimeout(() =>{
      //this is to decrement the time remaining, but why does it need a callbackfunction?  
      setTimeRemaining((timeRemaining)=> timeRemaining - 1 )
    }, 1000);

  //clean up after the timeout incase the component unmounts before the
  //timer is done
    return function (){
      clearTimeout(timerId)
    }
  }, [timeRemaining, onAnswered])
  //we want to run the useEffect function every time timeRemaining changes
  //onAnsered is also a dependency eventhough it doesn't change

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
