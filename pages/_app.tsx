import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "1" || event.key === "8") {
                document.getElementById("button-0")?.click();
            } else if (event.key === "2" || event.key === "9") {
                document.getElementById("button-1")?.click();
            } else if (event.key === "3" || event.key === "0") {
                document.getElementById("button-2")?.click();
            } else if (event.key === "4" || event.key === "-") {
                document.getElementById("button-3")?.click();
            }
        });
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
