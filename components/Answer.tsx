import { useEffect, useState } from "react";

type AnswerData = {
    click: () => void;
    length: number;
    buttonNumber: number;
    disabled: boolean;
    text: string;
    question: string;
    item: number;
};

function Answer(props: AnswerData): JSX.Element {
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        setClicked(false);
    }, [props.question]);

    return (
        <button
            className={
                "font-bold border-black my-2 md:mx-2 uppercase w-full md:w-1/" +
                props.length +
                (clicked ? " bg-black text-white" : "")
            }
            onClick={(event) => {
                event.preventDefault();
                setClicked(true);
                props.click();
            }}
            id={"button-" + props.buttonNumber}
            disabled={props.disabled}
        >
            <p>{props.text}</p>
            <p className="hidden md:block">
                <span className="shortcut">{1 + props.item}</span>
                <span className="shortcut">
                    {7 + props.item === 10 ? 0 : 7 + props.item}
                </span>
            </p>
        </button>
    );
}

export default Answer;
