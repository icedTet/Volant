import React, {useState, useEffect} from "react"
import { SocketConnection } from "../utils/classes/SocketStreamer";

const dylanPage = () => {
    const openSocket = () => {
        const socket = new SocketConnection();

    }

    return (<div>
        <div>Dylan's Test</div>
        <button className="bg-gray-300 rounded-lg p-3" onClick={openSocket}>Open Socket</button>
    </div>)
}

export default dylanPage;