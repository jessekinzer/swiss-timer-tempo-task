
import React from 'react';
import { Input } from '@/components/ui/input';

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-swiss font-medium text-gray-600 uppercase tracking-wider">
        Task Name
      </label>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter task description"
        disabled={disabled}
        className="font-swiss text-lg border-0 border-b-2 border-gray-200 rounded-none bg-transparent px-0 py-3 focus:border-black focus:ring-0 transition-colors"
      />
    </div>
  );
};

export default TaskInput;
