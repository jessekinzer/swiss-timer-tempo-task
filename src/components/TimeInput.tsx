
import React from 'react';
import { Button } from '@/components/ui/button';

interface TimeInputProps {
  minutes: number;
  seconds: number;
  onMinutesChange: (minutes: number) => void;
  onSecondsChange: (seconds: number) => void;
  disabled?: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({ 
  minutes, 
  seconds, 
  onMinutesChange, 
  onSecondsChange, 
  disabled 
}) => {
  const presetTimes = [
    { label: '05:00', minutes: 5, seconds: 0 },
    { label: '15:00', minutes: 15, seconds: 0 },
    { label: '25:00', minutes: 25, seconds: 0 },
    { label: '45:00', minutes: 45, seconds: 0 },
  ];

  const handlePresetClick = (presetMinutes: number, presetSeconds: number) => {
    onMinutesChange(presetMinutes);
    onSecondsChange(presetSeconds);
  };

  const adjustTime = (type: 'minutes' | 'seconds', delta: number) => {
    if (type === 'minutes') {
      const newMinutes = Math.max(0, Math.min(99, minutes + delta));
      onMinutesChange(newMinutes);
    } else {
      const newSeconds = Math.max(0, Math.min(59, seconds + delta));
      onSecondsChange(newSeconds);
    }
  };

  return (
    <div className="space-y-6">
      <label className="text-sm font-swiss font-medium text-gray-600 uppercase tracking-wider">
        Duration
      </label>
      
      {/* Time Display and Controls */}
      <div className="flex items-center justify-center space-x-8">
        <div className="text-center">
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustTime('minutes', 1)}
              disabled={disabled}
              className="h-6 w-12 p-0 text-gray-400 hover:text-black"
            >
              +
            </Button>
            <div className="font-mono text-4xl font-light">
              {minutes.toString().padStart(2, '0')}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustTime('minutes', -1)}
              disabled={disabled}
              className="h-6 w-12 p-0 text-gray-400 hover:text-black"
            >
              −
            </Button>
          </div>
          <div className="text-xs font-swiss text-gray-500 mt-2 uppercase tracking-wider">
            Minutes
          </div>
        </div>

        <div className="font-mono text-4xl font-light text-gray-300">:</div>

        <div className="text-center">
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustTime('seconds', 1)}
              disabled={disabled}
              className="h-6 w-12 p-0 text-gray-400 hover:text-black"
            >
              +
            </Button>
            <div className="font-mono text-4xl font-light">
              {seconds.toString().padStart(2, '0')}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustTime('seconds', -1)}
              disabled={disabled}
              className="h-6 w-12 p-0 text-gray-400 hover:text-black"
            >
              −
            </Button>
          </div>
          <div className="text-xs font-swiss text-gray-500 mt-2 uppercase tracking-wider">
            Seconds
          </div>
        </div>
      </div>

      {/* Preset Times */}
      <div className="grid grid-cols-4 gap-2">
        {presetTimes.map((preset) => (
          <Button
            key={preset.label}
            variant="outline"
            size="sm"
            onClick={() => handlePresetClick(preset.minutes, preset.seconds)}
            disabled={disabled}
            className="font-mono text-sm border-gray-200 hover:border-black hover:bg-transparent transition-colors"
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeInput;
