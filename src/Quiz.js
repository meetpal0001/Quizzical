import React from "react"
import blob from "./images/blob 5.png"
import blob2 from "./images/blobs.png"
import "./Quiz.css"
import Question from "./Question"


export default function Quiz(props) {

    const [qtns, setQtns] = React.useState([])
    const [calculated, setCalculated] = React.useState(false)
    const [score, setScore] = React.useState(0)





    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }




    React.useEffect(() => {
      const defaultQtns=[
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "What was the first video game in the Batman &quot;Arkham&quot; series?",
          "correct_answer": "Arkham Asylum",
          "incorrect_answers": [
            "Arkham Knight",
            "Arkham City",
            "Arkham Origins"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "History",
          "question": "In 1453, which important city fell?",
          "correct_answer": "Constantinople",
          "incorrect_answers": [
            "Rome",
            "Hamburg",
            "Athens"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Mythology",
          "question": "What mytological creatures have women&#039;s faces and vultures&#039; bodies?",
          "correct_answer": "Harpies",
          "incorrect_answers": [
            "Mermaids",
            "Nymph",
            "Lilith"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Japanese Anime &amp; Manga",
          "question": "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
          "correct_answer": "The Salamander",
          "incorrect_answers": [
            "The Dragon Slayer",
            "The Dragon",
            "The Demon"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "In which mall does &quot;Dead Rising&quot; take place?",
          "correct_answer": "Willamette Parkview Mall",
          "incorrect_answers": [
            "Liberty Mall",
            "Twin Pines Mall",
            "Central Square Shopping Center"
          ]
        }
      ]
        fetch("https://opentdb.com/api.php?amount=5&difficulty=" + props.difficulty + "&type=multiple").then(data => data.json())
            .then(data => {
                const decodedQuestions = data.results.map(qtn => ({
                    ...qtn,
                    question: decodeHTMLEntities(qtn.question),
                    correct_answer:decodeHTMLEntities(qtn.correct_answer),
                    incorrect_answers:qtn.incorrect_answers.map(ans=>decodeHTMLEntities(ans)),
                    selected: ""
                }));
                setQtns(decodedQuestions)


            }).catch((err) => {
                console.log("Error: " + err)
                const decodedQuestions = defaultQtns.map(qtn => ({
                    ...qtn,
                    question: decodeHTMLEntities(qtn.question),
                    correct_answer:decodeHTMLEntities(qtn.correct_answer),
                    incorrect_answers:qtn.incorrect_answers.map(ans=>decodeHTMLEntities(ans)),
                    selected: ""
                }));
                setQtns(decodedQuestions)
                 
            }
            )

            return function(){
              setQtns([])
            }

    }, [props.difficulty])


    function calculate(){
        qtns.map(qtn=>{
            if(qtn.correct_answer===qtn.selected){
                setScore(prevScore=>prevScore+1)
            }
            return qtn
        })

        setCalculated(true)
    }

    let view = []

    if (qtns) {
        view = qtns.map(qtn => {
            return <Question qtn={qtn} setQtns={setQtns} calculated={calculated}/>
        })
    }

    function playAgain(){
      props.setShowCover(true)
    }

    return (
        <div className="Quiz">
            <img src={blob} alt="blob" className="blob1" />
            <img src={blob2} alt="blob2" className="blob2" />
            {view}
            {calculated?<div><span>You Scored {score}/5 correct answers   </span><button className="check" onClick={playAgain}>Play Again</button></div>:<button className="check" onClick={calculate}>Check answers</button>}

        </div>
    )
}