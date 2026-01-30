"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (inputValue.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="w-screen h-screen bg-[#f2f2f2]">
      <div className="flex justify-center items-center py-[140px]">
        <div className="w-[377px] bg-[#ffffff] rounded-[6px] shadow-[#00000025] flex justify-center">
          <div className="flex flex-col gap-[60px]">
            <div className="w-[345px] gap-[32px] pt-[15px] pr-[10px] flex flex-col">
              <div className="gap-[20px] flex flex-col">
                <div className="flex justify-center items-center text-[20px] text-[#000000]">
                  To-Do list
                </div>

                <div className="flex flex-row gap-[6px]">
                  <input
                    type="text"
                    placeholder="Add a new task..."
                    className="w-[280px] h-[40px] border-[1px] border-[#e4e4e7] rounded-[6px] text-[14px] text-[#71717a] pl-[15px]"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                  />
                  <Button
                    onClick={addTask}
                    className="bg-[#3c82f6] w-[59px] h-[40px] text-[14px] text-[#f9f9f9]"
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-row gap-[6px]">
                  <Button
                    onClick={() => setFilter("all")}
                    className={`w-[38px] h-[32px] text-[12px] ${
                      filter === "all"
                        ? "bg-[#3c82f6] text-white"
                        : "bg-[#f3f4f6] text-[#363636]"
                    }`}
                  >
                    All
                  </Button>
                  <Button
                    onClick={() => setFilter("active")}
                    className={`w-[60px] h-[32px] text-[12px] ${
                      filter === "active"
                        ? "bg-[#3c82f6] text-white"
                        : "bg-[#f3f4f6] text-[#363636]"
                    }`}
                  >
                    Active
                  </Button>
                  <Button
                    onClick={() => setFilter("completed")}
                    className={`w-[87px] h-[32px] text-[12px] ${
                      filter === "completed"
                        ? "bg-[#3c82f6] text-white"
                        : "bg-[#f3f4f6] text-[#363636]"
                    }`}
                  >
                    Completed
                  </Button>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  {filteredTasks.length === 0 ? (
                    <div className="text-[14px] text-[#6b7280] flex justify-center">
                      No tasks yet. Add one above!
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex justify-between items-center border border-[#e4e4e7] rounded-[6px] px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)}
                          />
                          <span
                            className={`text-[14px] ${
                              task.completed
                                ? "line-through text-[#9ca3af]"
                                : "text-[#000000]"
                            }`}
                          >
                            {task.text}
                          </span>
                        </div>
                        <Button
                          onClick={() => deleteTask(task.id)}
                          className="bg-[#ef4444] w-[55px] h-[28px] text-[12px] text-white"
                        >
                          Delete
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-[4px] justify-center mb-4">
              <div className="text-[12px] text-[#6b7280]">Powered by</div>
              <a
                className="text-[12px] text-[#3b73ed]"
                href="https://talent.pinebaatars.mn/"
              >
                Pinecone academy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
