import todos from "@/dummy_todo";
import { Todo } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === "GET") {
      res.status(200).json(todos);
   } else if (req.method === 'POST') {
      const newTodoItem: Todo = req.body;

      todos.push(newTodoItem);

      res.status(201).json(newTodoItem);
   } else {
      res.status(405).json({ message: 'Method not allowed' });
   }
}
