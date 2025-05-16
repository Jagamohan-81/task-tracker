'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/apiClient';
import axios from 'axios';

import { Task } from '@/types/task';

export const TaskList = () => {
  const { data, isLoading, error, refetch: mutate } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => api.get('/tasks').then((res) => res.data),
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      alert('Task deleted successfully!');
      mutate(); // Re-fetch tasks
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) {
    console.error('Error fetching tasks:', error);
    return <p>Something went wrong while loading tasks. Please try again later.</p>;
  }

  return (
    <ul className="space-y-2">
      {data?.map((task) => (
        <li key={task.id} className="flex justify-between items-center border p-2 rounded">
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span className="text-sm italic text-gray-500">{task.status}</span>
          </div>
          <button onClick={() => handleDelete(task.id)} className="text-red-500">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
