import React from 'react';
import './styles/animations.scss'; // Make sure to create and style this CSS file

const Animations = (props) => {
    const {client} = props.mqttClient;

    const animations = [
        'DYNAMrainbow',
        'DYNAMchase',
        'DYNAMfade',
        'DYNAMcolorwipe',
        'DYNAMmulticolorwipe',
        'DYNAMtwinkle',
        'DYNAMpulses'
    ];

    const images = [
        'url(./rainbow.gif)',
        'url(./colorchase.webp)',
        'url(./homer.gif)',
        'url(./colorwipe.webp)',
        'url(./multicolorwipe.jpg)',
        'url(./twinkle.gif)',
        'url(./pulse.gif)'
    ];

    const handleClick = (animations, index) => {
        console.log(`Button ${index + 1} with color ${animations} clicked`);

        // Implement your custom logic here
        const colorToSend = animations;
        var options = { retain: true };
        console.log(colorToSend);
        client.publish('GUHemmTree', colorToSend, options);
        console.log('Message sent');
    };

    const buttons = animations.map((color, index) => (
        <button class='animation-button'
            key={index} 
            className="animation-button" 
            style={{ backgroundImage: images[index] }}
            onClick={() => handleClick(color, index)}
        >
            
        </button>
    ));
    
    return (
        <div className="static-colors-container">
            <h1>Animations!</h1>
            <div className="grid-container">
                {buttons}
            </div>
        </div>
    );
};

export default Animations;