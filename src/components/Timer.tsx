
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Square, Timer as TimerIcon } from 'lucide-react';
import TaskInput from './TaskInput';
import TimeInput from './TimeInput';

const Timer: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalTime = minutes * 60 + seconds;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(totalTime);
    }
    setIsRunning(true);
    setIsCompleted(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsCompleted(false);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 font-swiss">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TimerIcon className="h-6 w-6 text-black" />
            <h1 className="text-2xl font-swiss font-medium tracking-tight">
              Focus Timer
            </h1>
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            Minimalist Task Timer
          </p>
        </div>

        {/* Main Timer Display */}
        {(isRunning || timeLeft > 0) && (
          <div className="text-center mb-16">
            <div className="mb-12">
              <h2 className="text-lg font-swiss font-medium text-gray-600 mb-12">
                {taskName || 'Untitled Task'}
              </h2>
              <div className="font-mono text-[20rem] md:text-[28rem] font-extralight tracking-tighter leading-none">
                {formatTime(timeLeft)}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-1 rounded-full mb-12">
              <div 
                className="bg-black h-1 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Timer Controls */}
            <div className="flex justify-center space-x-4">
              {!isRunning ? (
                <Button
                  onClick={handleStart}
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-swiss tracking-wide"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {timeLeft > 0 ? 'Resume' : 'Start'}
                </Button>
              ) : (
                <Button
                  onClick={() => setIsRunning(false)}
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white px-8 py-3 font-swiss tracking-wide"
                >
                  Pause
                </Button>
              )}
              
              <Button
                onClick={handleStop}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500 px-8 py-3 font-swiss tracking-wide"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </div>
          </div>
        )}

        {/* Completion State */}
        {isCompleted && (
          <div className="text-center mb-16 animate-pulse-subtle">
            <div className="font-mono text-[20rem] md:text-[28rem] font-extralight mb-12 tracking-tighter leading-none">00:00</div>
            <p className="text-lg font-swiss text-green-600 mb-6">Task Completed!</p>
            <Button
              onClick={handleStop}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-swiss tracking-wide"
            >
              New Session
            </Button>
          </div>
        )}

        {/* Setup Form */}
        {!isRunning && timeLeft === 0 && !isCompleted && (
          <div className="space-y-12">
            <TaskInput
              value={taskName}
              onChange={setTaskName}
            />
            
            <TimeInput
              minutes={minutes}
              seconds={seconds}
              onMinutesChange={setMinutes}
              onSecondsChange={setSeconds}
            />

            <div className="text-center">
              <Button
                onClick={handleStart}
                disabled={totalTime === 0}
                className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 px-12 py-4 text-lg font-swiss tracking-wide"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Timer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
