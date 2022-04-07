import React, { useState, useEffect } from 'react';

function ReturnTour(props) {

    const [userInput, setUserInput] = useState('')

    useEffect(() => {
        setUserInput(props.steps[1].value)
        console.log(userInput)
    })
    return (
        <div>
            {userInput}
        </div>
    );
}

export default ReturnTour;