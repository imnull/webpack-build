import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

import './app.css'

export default ({ count = 0 }) => {
    const [C, setC] = useState(count)

    return (
        <div className="container">
            <h1>Count: {C}</h1>
            <div>
            <Button onClick={() => setC(C + 1)}>Add</Button>
            <Button onClick={() => setC(C - 1)}>Sub</Button>
            </div>
        </div>
    )
}