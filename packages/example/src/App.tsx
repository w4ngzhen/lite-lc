import React from 'react';
import './styles/app.css';
import {SimpleExample} from "./pages/SimpleExample";
import {CustomCreateElementExample} from "./pages/CustomCreateElementExample";
import {DesignCanvasExample} from "./pages/DesignCanvasExample";
import {RuntimeCanvasExample} from "./pages/RuntimeCanvasExample";

function App() {
    return (
        <RuntimeCanvasExample/>
    );
}

export default App;
