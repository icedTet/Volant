import React, {useState, useEffect} from "react"
import { SocketConnection } from "../utils/classes/SocketStreamer";

const dylanPage = () => {
    useEffect(() => {
        const socket = new SocketConnection();
    }, [])

    return (<div>
        Dylan's Test
    </div>)
}

export default dylanPage;