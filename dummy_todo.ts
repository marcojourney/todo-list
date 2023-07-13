import { Todo } from "@/interfaces";

const todos: Todo[] = [
   {
     id: "1",
     todo: "First Interview by casual phone with VTech",
     isCompleted: false,
     createdAt: new Date().toISOString()
   },
   {
     id: "2",
     todo: "Second Interview by Online in an hour",
     isCompleted: false,
     createdAt: new Date().toISOString()
   },
   {
     id: "3",
     todo: "In-person Interview with VTech",
     isCompleted: false,
     createdAt: new Date().toISOString()
   },
   {
     id: "4",
     todo: "Technical Assessment for VTech",
     isCompleted: false,
     createdAt: new Date().toISOString()
   },
   {
     id: "5",
     todo: "Follow-up Interview with VTech",
     isCompleted: false,
     createdAt: new Date().toISOString()
   },
   {
     id: "6",
     todo: "Reference Check for VTech",
     isCompleted: false,
     createdAt: new Date().toISOString()
   },
   {
     id: "7",
     todo: "Negotiate Offer with VTech",
     isCompleted: false,
     createdAt: new Date().toISOString()
   },
   {
     id: "8",
     todo: "Accept Offer and Confirm Start Date with VTech",
     isCompleted: false,
     createdAt: new Date().toISOString()
   }
];

export default todos;