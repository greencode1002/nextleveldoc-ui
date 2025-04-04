import React, { useEffect, useState } from 'react';

const TimeCounter = ({ targetDate, onTimeZero, setTimeIsZero }) => {
    const calculateTimeLeft = () => {
        const difference = Date.parse(targetDate) - Date.parse(new Date());
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            if (onTimeZero) {
                onTimeZero();
            }
            if (setTimeIsZero) {
                setTimeIsZero(true);
            }
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [targetDate, timeLeft]);

    const formatTime = (value) => value?.toString().padStart(2, '0');


    return (
        <>
            {(timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds) > 0 ? (
                <span >
                    <span className='text-white'> Remaining Times : </span> <span className='Error'> {formatTime(timeLeft.days)} d: {formatTime(timeLeft.hours)} h: {formatTime(timeLeft.minutes)} m: {formatTime(timeLeft.seconds)} s</span>
                </span>
            ) : null}
        </>
    );
};

export default TimeCounter;
