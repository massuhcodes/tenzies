import die1 from "../assets/die1.svg";
import die2 from "../assets/die2.svg";
import die3 from "../assets/die3.svg";
import die4 from "../assets/die4.svg";
import die5 from "../assets/die5.svg";
import die6 from "../assets/die6.svg";
import { nanoid } from "nanoid";

export const diceFaces = [die1, die2, die3, die4, die5, die6];

export function allNewDiceValues() {
    let values = [];
    for (let i = 0; i < 10; i++) {
        values.push(generateNewDie());
    }
    return values;
}

export function generateNewDie() {
    const value = Math.ceil(Math.random() * 6);
    const image = diceFaces[value - 1];
    return {
        value: value,
        image: image,
        isHeld: false,
        id: nanoid(),
    };
}