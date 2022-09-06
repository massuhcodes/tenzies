import "../styles/Die.css";

export default function Die(props) {
    return (
        <div
            className={props.held ? "die is-held" : "die not-held"}
            onClick={props.holdDice}
        >
            <span>{props.value}</span>
        </div>
    );
}
