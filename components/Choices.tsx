type ChoicesData = {
    title: string;
    setFunction: <T>(T) => void;
    items: <T>[];
    default: <T>;
}

function Choices(props: ChoicesData): JSX.Element {
    return (
        <div>
            <h2>{props.title}</h2>
            {Object.keys(props.items).map((value) => (
                <button
                    key={value}
                    className={
                        props.items[value as keyof typeof props.items] ===
                        props.default
                            ? "bg-red-400"
                             : ""
                    }
                    onClick={(event) => {
                        event.preventDefault();
                        props.setFunction(
                            props.items[value as keyof typeof props.items]
                        );
                    }}
                >
                      {value}
                </button>
            ))}
        </div>
    );
}

export default Choices;