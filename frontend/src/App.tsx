import './App.css'
import {useEffect, useState} from "react";
import {helloApi} from "./api/hello.ts";

function App() {

    const [content, setContent] = useState<string>('')

    useEffect(() => {
        helloApi()
            .then(res => {
                setContent(res)
            })
    }, [])

    return (
        <>
            <h1>hello k8s</h1>
            <div className="card">
                {content}
            </div>
        </>
    )
}

export default App
