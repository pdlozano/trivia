import Link from "next/link";

function Header(): JSX.Element {
    return (
        <header className="px-8 py-4">
            <h1>
                <Link href="/">Trivia App</Link>
            </h1>
            <p>
                Powered by the{" "}
                <Link href="https://opentdb.com/">
                    Open Trivia Database API
                </Link>
                . Test your knowledge on a variety of categories.
            </p>
        </header>
    );
}

export default Header;
