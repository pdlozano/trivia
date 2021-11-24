type TallyData = {
    data: boolean[];
    length: number;
};

function Tally(props: TallyData): JSX.Element {
    const items = new Array(props.length).fill(undefined);

    return (
        <div>
            <h1>Tally</h1>
            {items.map((item, index) => {
                if (props.data[index] !== undefined) {
                    return (
                        <span key={index}>
                            {props.data[index] ? "Correct" : "Incorrect"}
                        </span>
                    );
                } else {
                    return <span key={index}>None</span>;
                }
            })}
        </div>
    );
}

export default Tally;
