import React, { useState, useEffect, useRef } from 'react';
import ModalAlert from './ModalAlert.js'

// import './styles/patterns.scss'; // Make sure to create and style this CSS file
import '../App.scss';

const Pride = (props) => {
    const {client} = props.mqttClient;
    const [showModal, setShowModal] = useState(false); // Define the showModal state
    const [clickCount, setClickCount] = useState(0);
    const clickTimestamps = useRef([]);
    const [timer, setTimer] = useState(null);


    useEffect(() => {
        if (clickCount >= 5) {
            setShowModal(true);
            setClickCount(0);
            clickTimestamps.current = [];
        }
    }, [clickCount]);
    const pride = [
        'FRACS001159205200130145255255255200130145001159205001159205200130145255255255200130145001159205001159205200130145255255255200130145001159205',
        'FRACS255033140255216000033177255255033140255216000033177255255033140255216000033177255',
        'FRACS080000082080000082036010071000000100000000100080000082080000082036010071000000100000000100080000082080000082036010071000000100000000100',
        'FRACS007142112038206170152232193255255255123173226060073203041026125007142112038206170152232193255255255123173226060073203041026125',
        'FRACS213045000235124066255255255180078144143002078213045000235124066255255255180078144143002078213045000235124066255255255180078144143002078',
        'FRACS001001001100100100255255255104006080001001001100100100255255255104006080001001001100100100255255255104006080',
        'FRACS255216000255255255140089180001001001255216000255255255140089180001001001255216000255255255140089180001001001',
        'FRACS058166064168212122255255255130130130001001001058166064168212122255255255130130130001001001058166064168212122255255255130130130001001001',
        'FRACS141076200255255255034109025141076200255255255034109025141076200255255255034109025',
        'FRACS228003003255140000255237000000128038000076255255041255'
    ];
    const images = [
        'url(./trans.png)',
        'url(./pan.png)',
        'url(./bi.png)',
        'url(./gay.png)',
        'url(./lesbian.png)',
        'url(./ace.png)',
        'url(./nonbinary.png)',
        'url(./aro.png)',
        'url(./queer.jpg)',
        'url(./Pride.png)'
    ];
    const labels = [
        'Trans', 
        'Pan',
        'Bi',
        'Gay',
        'Lesbian',
        'Ace',
        'Nonbinary',
        'Aro',
        'Queer',
        'Pride'
    ];
    const handleClick = (pride, index) => {
        console.log(`Button ${index + 1} with color ${pride} clicked`);
        // Implement your custom logic here
        const colorToSend = pride;
        var options = { retain: true };
        console.log(colorToSend);
        client.publish('GUHemmTree', colorToSend, options);
        client.publish('GUHemmTreeStats', colorToSend+"," + props.User.user);

        console.log('Message sent');
    };

    const ratelimit = (color, index) => {
        if (timer) {
            clearInterval(timer);
        }

        setClickCount(prevCount => prevCount + 1);

        const newTimer = setInterval(() => {
            setClickCount(0);
            clearInterval(newTimer);
        }, 1000);

        setTimer(newTimer);

        handleClick(color, index);
    };
    
    const buttons = pride.map((pride, index) => (
        <div key={index} className="pattern-button-container">

            <button
                key={index} 
                className="pride-button" 
                style={{ backgroundImage: images[index] }}

                onClick={() => ratelimit(pride, index)}
            >
                
            </button>
            <div className="label">{labels[index]}</div>

        </div>
    ));
    return (
        <div className="static-colors-container">
            <h1>Pride Flags!</h1>
            <div className="grid-container">
                {buttons}
            </div>
            <ModalAlert show={showModal} onClose={() => setShowModal(false)}>
                <p>Please slow down! Spamming makes it no fun for anyone.</p>
            </ModalAlert>
        </div>
    );
};

export default Pride;