import {
    useQuery,
} from "@tanstack/react-query";
import axios from "axios";

import './App.css'


export function CurrentTime(props) {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: [props.api],
        queryFn: () =>
            axios
                .get(`${props.api}`)
                .then((res) => res.data),
    });

    if (isLoading) return `Loading ${props.api}... `;

    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="App">
            <p>---</p>
            <p>API: {data.api}</p>
            <p>Time from DB: {data.now}</p>
            <div>{isFetching ? "Updating..." : ""}</div>
        </div>
    )
}