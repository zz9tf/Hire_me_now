import React from 'react'
import {useState, useEffect} from 'react'

const TEST = () => {

    let [test, setTest] = useState([])

    useEffect(() => {
        getTestData()
    }, [])

    let getTestData = async () => {
        let response = await fetch('/api/routes')
        let data = await response.json()
        console.log('DATA:', data)
        setTest(data);
    }

    return (
        <div>
            
        </div>
    )
}

export default TEST
