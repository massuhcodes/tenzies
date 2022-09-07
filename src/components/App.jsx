import "../styles/App.css";
import { useState, useEffect } from "react";
import { allNewDiceValues, generateNewDie } from "../utils/utilities";
import Confetti from "react-confetti";
import Die from "../components/Die";

export default function App() {
    function reRollDice() {
        setDiceValues((prevDiceValues) => {
            return prevDiceValues.map((die) => {
                return die.isHeld ? die : generateNewDie();
            });
        });
    }

    function newGame() {
        setTenzies(false);
        setDiceValues(allNewDiceValues());
    }

    function holdDice(id) {
        setDiceValues((prevDiceValues) => {
            return prevDiceValues.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            });
        });
    }

    const [diceValues, setDiceValues] = useState(allNewDiceValues());

    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        if (diceValues.every((die) => die.isHeld === true)) {
            setTenzies(true);
        }
    }, [diceValues]);

    const dice = diceValues.map((die) => (
        <Die
            image={die.image}
            value={die.value}
            key={die.id}
            held={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));

    return (
        <main>
            {tenzies && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            )}
            <div className="app">
                <div className="inner-app">
                    <div className="text">
                        <h1>Tenzies</h1>
                        <h2>
                            Roll until all dice are the same. Click each die to
                            freeze it at its current value between rolls.
                        </h2>
                    </div>
                    <div className="dice-container">{dice}</div>
                    <button onClick={tenzies ? newGame : reRollDice}>
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                </div>
            </div>
        </main>
    );
}
