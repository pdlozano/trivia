type TallyData = {
    data: boolean[];
    length: number;
};

function Tally(props: TallyData): JSX.Element {
    const items = new Array(props.length).fill(undefined);

    return (
        <div>
            <div className="flex w-100 justify-center">
                {items.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                "tally " +
                                (props.data[index] === undefined
                                    ? "tally-noans"
                                    : props.data[index]
                                    ? "tally-correct"
                                    : "tally-wrong")
                            }
                        >
                            {""}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Tally;
