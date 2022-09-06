import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "../styles/App.css";
import Die from "../components/Die";

export default function App() {
    function allNewDiceValues() {
        let values = [];
        for (let i = 0; i < 10; i++) {
            values.push(generateNewDie());
        }
        return values;
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

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
