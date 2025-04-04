import React, { useEffect, useState } from 'react';

function TimeCounterCircle({ time_start }) {
    const [timeLimit, setTimeLimit] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);


    function formatTime(time) {
        const days = Math.floor(time / (3600 * 24)).toString().padStart(2, '0');
        const hours = Math.floor((time % (3600 * 24)) / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return <div>
            <p>
                {`${days}d: ${hours}h:`}
            </p>
            <p>
                {`${minutes}m: ${seconds}s`}
            </p>
        </div>

    }

    useEffect(() => {
        if (time_start) {
            const currentDate = new Date();
            const startDateString = `${time_start}`; // Assuming start_date is a valid date string
            const startDate = new Date(startDateString);

            if (startDate > currentDate) {
                const remainingTime = Math.floor((startDate - currentDate) / 1000); // Difference in seconds
                setTimeLimit(remainingTime);
                setHasStarted(false); // Timer hasn't started yet
            } else {
                setTimeLimit(0);
                setHasStarted(true); // Timer has already started
            }
        }
    }, [time_start]);

    useEffect(() => {
        if (!hasStarted && timeLimit > 0) {
            const timer = setInterval(() => {
                setTimeLimit(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setHasStarted(true); // Start the event once timer reaches zero
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLimit, hasStarted]);
    return (
        <div className=" flex items-center justify-center " >
            {!hasStarted ? (
                <span id="timer" className="absolute text-[9px] text-C4782F4 font-bold">
                    {formatTime(timeLimit)} {/* Display time remaining until event start */}
                </span>
            ) : (
                <span id="started" className="absolute text-[9px] text-green-500 font-bold">
                    Event Started!
                </span>
            )}
            <svg className="timer-svg" width={50} height={50} viewBox="0 0 30 30" fill="none" >
                <circle id="time-style" className="transition-all duration-1000"  cx={15} cy={15} r={15} fill="#26284C" />

            </svg>
        </div>
    );
}

export default TimeCounterCircle;