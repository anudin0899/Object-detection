"use client"
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { load as cocossdload } from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { renderPrediction } from '@/utils/render-predictions';

let DetectInterval

const ObjectDetection = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [loading, setLoading] = useState(true);

    async function runObjectDetection(net) {
        if (canvasRef.current && webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            //find detected objects
            const detectedObjects = await net.detect(
                webcamRef.current.video, undefined, 0.6
            );

            // console.log(detectedObjects);
            const context = canvasRef.current.getContext("2d");
            renderPrediction(detectedObjects,context);
        }
    }

    const showMyVideo = () => {

        if (webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
            const myVideoWidth = webcamRef.current.video.videoWidth;
            const myVideoHeight = webcamRef.current.video.videoHeight;
            webcamRef.current.video.videoWidth = myVideoWidth;
            webcamRef.current.video.videoHeight = myVideoHeight;
        }
    };

    const runCoco = async () => {
        setLoading(true);
        const result = await cocossdload();
        setLoading(false);
        DetectInterval = setInterval(() => {
            runObjectDetection(result)
        }, 10)
    }



    useEffect(() => {
        runCoco();
        showMyVideo();
    }, []);




    return (
        <div className='mt-8'>

            {loading ?
                (<div className='text-white'>
                    <h2>Loading AI Model</h2>
                </div>)
                :
                <div className='relative flex justify-center items-center  p-1.5 rounded-md'>

                    <Webcam
                        className='rounded-md w-full lg:h-[720px]'
                        ref={webcamRef}
                        muted
                    />

                    <canvas
                        ref={canvasRef}
                        className='absolute top-0 left-0 z-99999 w.full lg:h-[720px]'
                    />
                </div>
            }
        </div >
    )
}

export default ObjectDetection