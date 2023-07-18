import React, { useEffect, useState } from "react";

const Content = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  const addTask = (e) => {
    if (task) {
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
        status: activeTab === "Active" ? "active" : "inactive",
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };
  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "active" ? "completed" : "active",
            }
          : task
      )
    );
  };

  const activeTasks = tasks.filter((task) => task.status === "active");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const onTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen w-screen ">
      <div className="container flex justify-center flex-col items-center mx-auto mt-8">
        <div className="flex justify-center space-x-28 border-b-2 w-[500px] ">
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "All"
                ? "bg-btnColor text-black"
                : "text-black bg-btnColor"
            }`}
            onClick={() => onTabClick("All")}
          >
            All
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "Active"
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600"
            }`}
            onClick={() => onTabClick("Active")}
          >
            Active{" "}
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "Completed"
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600"
            }`}
            onClick={() => onTabClick("Completed")}
          >
            Completed{" "}
          </button>
        </div>
        <div className="bg-white p-4 w-[500px] mt-2">
          {activeTab === "All" && (
            <div>
              <div className="flex">
                <input
                  className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  placeholder="add details"
                  name="task"
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
                />
                <button
                  type="submit"
                  onClick={addTask}
                  className="w-full  flex ml-2 justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2F80ED] hover:bg-red-500 capitalize focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>

              <div className="flex justify-between  flex-col mt-4">
                {tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <li
                      key={task.id}
                      className="form-control bg-white mt-2 p-2 flex"
                    >
                      <input
                        type="checkbox"
                        checked={task.status === "active"}
                        onChange={() => toggleTaskStatus(task.id)}
                      />{" "}
                      <div className="ml-2">{task.title}</div>
                    </li>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Active" && (
            <div className="mt-4">
              {/* Render active tasks */}
              {activeTasks.map((task) => (
                <React.Fragment key={task.id}>
                  <li
                    key={task.id}
                    className="form-control bg-white mt-2 p-2 flex"
                  >
                    <input
                      type="checkbox"
                      checked={task.status === "completed"}
                      onChange={() => toggleTaskStatus(task.id)}
                    />{" "}
                    <div className="ml-2">{task.title}</div>
                  </li>
                </React.Fragment>
              ))}
            </div>
          )}

          {activeTab === "Completed" && (
            <div className="mt-4">
              {completedTasks.map((task) => (
                <React.Fragment key={task.id}>
                  <li
                    key={task.id}
                    className="form-control bg-white mt-2 p-2 flex"
                  >
                    <input type="checkbox" checked />{" "}
                    {/* This will show a checked checkbox */}
                    <div className="ml-2">{task.title}</div>
                  </li>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
