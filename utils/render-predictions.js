import {throttle} from 'loadsh';

export const renderPrediction = (predictions, ctx) => {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //Fonts
    const fonts = "16px sans-serif"
    ctx.font = fonts
    ctx.textBaseline = "top"

    predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction["bbox"];

        const isPerson = prediction.class === "person";

        // bounding box 
        ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);

        // fill the color
        ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`;
        ctx.fillRect(x, y, width, height);

        // Draw the label background
        ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(fonts, 10);
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

        ctx.fillStyle = '#000000';
        ctx.fillText(prediction.class, x, y);

        if (isPerson) {
            playAudio();
        }
    });
}

const playAudio = throttle(() => {
    const audio = new Audio("/siren.mp3");
    audio.play();
}, 1000)