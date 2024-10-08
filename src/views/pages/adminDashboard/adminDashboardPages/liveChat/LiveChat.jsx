import React from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";

function ChatButton({ name, initial, notificationCount }) {
  return (
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
      <div
        className={`flex items-center justify-center h-8 w-8 bg-${
          notificationCount ? "red" : "gray"
        }-200 rounded-full`}
      >
        {initial}
      </div>
      <div className="ml-2 text-sm font-semibold">{name}</div>
      {notificationCount && (
        <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
          {notificationCount}
        </div>
      )}
    </button>
  );
}

function ChatInput() {
  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div>
        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />
          <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="ml-4">
        <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
          <span>Send</span>
          <span className="ml-2">
            <svg
              className="w-4 h-4 transform rotate-45 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

function Message({ isSender, children, seen }) {
  return (
    <div
      className={`col-start-${
        isSender ? "6 col-end-13" : "1 col-end-8"
      } p-3 rounded-lg`}
    >
      <div
        className={`flex items-center justify-${
          isSender ? "start flex-row-reverse" : "start"
        }`}
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          A
        </div>
        <div
          className={`relative ${isSender ? "mr" : "ml"}-3 text-sm ${
            isSender ? "bg-indigo-100" : "bg-white"
          } py-2 px-4 shadow rounded-xl`}
        >
          {children}
          {seen && (
            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
              Seen
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function UserProfile({ name, avatar, status }) {
  return (
    <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg relative">
      <div className="h-20 w-20 rounded-full border relative">
        <img src={avatar} alt={name} className="h-full w-full rounded-full" />
        {status === "active" && (
          <div className="absolute bottom-2 right-0 h-4 w-4 bg-green-500 border-white border-2 rounded-full"></div>
        )}
      </div>
      <div className="text-sm font-semibold mt-2">{name}</div>
    </div>
  );
}

export default function LiveChat() {
  return (
    <DashboardContainer>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <UserProfile
              name="Aminos Co."
              avatar="https://avatars3.githubusercontent.com/u/2763884?s=128"
              status="active"
            />
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  4
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                <ChatButton name="Henry Boyd" initial="H" />
                <ChatButton
                  name="Martin Usain"
                  initial="M"
                  notificationCount={3}
                />
                <ChatButton name="Oslo Hoot" initial="O" />
                <ChatButton name="Skylar Mink" initial="S" />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    <Message isSender={false}>Lorem ipsum dolor sit.</Message>
                    <Message isSender={true} seen>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Facere eius accusamus unde neque suscipit dolor!
                    </Message>
                    <Message isSender={false}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Message>
                    <Message isSender={true}>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Expedita, sint! Lorem ipsum dolor sit amet consectetur.
                    </Message>
                  </div>
                </div>
              </div>
              <ChatInput />
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
