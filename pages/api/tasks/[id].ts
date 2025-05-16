import { NextApiRequest, NextApiResponse } from 'next';
let tasks = [
    { id: '1', title: 'Learn Zustand', status: 'pending' },
    { id: '2', title: 'Use TanStack Query', status: 'completed' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    switch (req.method) {
        case 'GET':
            return res.status(200).json(tasks[taskIndex]);

        case 'PUT':
            const updatedTask = { ...tasks[taskIndex], ...req.body };
            tasks[taskIndex] = updatedTask;
            return res.status(200).json(updatedTask);

        case 'DELETE':
            tasks.splice(taskIndex, 1);
            return res.status(204).end();

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}