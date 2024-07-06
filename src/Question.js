import React from "react"


export default function Question(props) {
    const [options] = React.useState(() => getAns())


    function shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }




    let view = options.map(ans => {
        let clsName


        if (props.calculated) {
            if (props.qtn.correct_answer===ans){

                clsName="correct"

            }
            else if(props.qtn.correct_answer!==ans&&props.qtn.selected===ans){
                clsName="inCorrect"
            }
            else{
                clsName="notSelected"
            }
        }
        else{
            clsName = props.qtn.selected === ans ? "selected" : ""
        }
        console.log(clsName)


        return <button onClick={select} className={clsName}>{ans}</button>
    })


    function getAns() {
        let ans = [...props.qtn.incorrect_answers, props.qtn.correct_answer]
        shuffle(ans)

        return ans

    }




    function select(event) {
        props.setQtns(prevQtns => {
            let newQtns = prevQtns.map(qtn => qtn.question === props.qtn.question ? { ...qtn, selected: event.target.textContent } : qtn)
            return newQtns
        })
    }

    return (
        <div className="question">
            <h1>{props.qtn.question}</h1>
            <div className="btnGrp">
                {view}
            </div>
            <hr />
        </div>
    )
}