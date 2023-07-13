import { NextApiRequest, NextApiResponse } from "next";
import todos from "@/dummy_todo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
      const { id } = req.query;
      const foundTodo = todos.find(todo => todo.id === id);

      if (!foundTodo) {
         return res.status(404).json({ error: "Todo not found" });
      }

      const { todo, isCompleted } = req.body;
      foundTodo.todo = todo;
      foundTodo.isCompleted = isCompleted;

      res.json(foundTodo);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      const foundTodoAt = todos.findIndex(todo => todo.id === id);

      if (foundTodoAt === -1) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
}
