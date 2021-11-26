import { useEffect, useState } from "react";

type AnswerData = {
    click: () => void;
    length: number;
    buttonNumber: number;
    disabled: boolean;
    text: string;
};

function Answer(props: AnswerData): JSX.Element {
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        setClicked(false);
    }, [props.text]);

    return (
        <button
            className={
                "font-bold border-black mx-2 uppercase w-1/" +
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
            {props.text}
        </button>
    );
}

export default Answer;