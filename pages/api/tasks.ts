// pages/api/tasks.ts
let tasks = [
    { id: '1', title: 'Learn Zustand', status: 'pending' },
    { id: '2', title: 'Use TanStack Query', status: 'completed' },
  ];
  import type { NextApiRequest, NextApiResponse } from 'next';
  
  export default function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'GET') {
      return res.status(200).json(tasks);
    }
  
    if (req.method === 'POST') {
      const { title, status } = req.body;
      const newTask = { id: Date.now().toString(), title, status };
      tasks.push(newTask);
      return res.status(201).json(newTask);
    }
  
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  