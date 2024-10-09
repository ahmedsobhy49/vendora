import React from "react";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { GrAttachment } from "react-icons/gr";
import { BsFillSendFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function ChatButton({ name, initial, notificationCount }) {
  return (
    <NavLink className="flex flex-row items-center hover:bg-gray-300 rounded-xl p-2">
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
    </NavLink>
  );
}

function ChatInput() {
  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div>
        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
          <GrAttachment />
        </button>
      </div>
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-blue-300 pl-4 h-10"
          />
        </div>
      </div>
      <div className="ml-4">
        <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
          <span>Send</span>
          <span className="ml-2">
            <BsFillSendFill />
          </span>
        </button>
      </div>
    </div>
  );
}

function Message({ isSender, children, seen }) {
  return (
    <div
      className={`col-start-1 col-end-12 ${
        isSender
          ? "xl:col-start-6 xl:col-end-12"
          : "xl:col-start-1 xl:col-end-8"
      } p-3 rounded-lg`}
    >
      <div
        className={`gap-4 flex items-center justify-${
          isSender ? "start flex-row-reverse" : "start"
        }`}
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 flex-shrink-0">
          A
        </div>
        <div
          className={`relative ${isSender ? "mr" : "ml"}-3 text-sm ${
            isSender ? "bg-blue-100" : "bg-white"
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

function UserProfile({ name, role, avatar, status }) {
  return (
    <div className=" flex-col items-center mt-4 w-full py-6 px-4 rounded-lg relative hidden lg:flex">
      <div className="h-20 w-20 rounded-full border relative">
        <img src={avatar} alt={name} className="h-full w-full rounded-full" />
        {status === "active" && (
          <div className="absolute bottom-2 right-0 h-4 w-4 bg-green-500 border-white border-2 rounded-full"></div>
        )}
      </div>
      <div className="text-sm font-semibold mt-2">{name}</div>
      <div className="text-sm font-semibold mt-2">{role}</div>
    </div>
  );
}

function ChatArea() {
  return (
    <div className=" flex-col flex-auto lg:h-full px-6 custom-hight hidden lg:flex">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4 hide-scrollbar">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              <Message isSender={false}>Lorem ipsum dolor sit.</Message>
              <Message isSender={true} seen>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                eius accusamus unde neque suscipit dolor!
              </Message>
              <Message isSender={false}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Message>
              <Message isSender={true} seen>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Expedita, sint! Lorem ipsum dolor sit amet consectetur.
              </Message>
            </div>
          </div>
        </div>
        <ChatInput />
      </div>
    </div>
  );
}

function ChatAside() {
  return (
    <div className="flex-col py-8 px-4 w-10/12 lg:w-72 xl:w-80 2xl:w-96 bg-white rounded-2xl shadow-lg flex-shrink-0 custom-hight mx-auto">
      <UserProfile
        name="Aminos Co."
        avatar="https://avatars3.githubusercontent.com/u/2763884?s=128"
        status="active"
        role={"Seller"}
      />
      <div className="flex flex-col mt-8  h-[43rem] lg:h-[30rem] 2xl:h-[35rem] overflow-auto pe-6">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            4
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 w-full">
          <ChatButton name="Henry Boyd" initial="H" />
          <ChatButton name="Martin Usain" initial="M" notificationCount={3} />
          <ChatButton name="Oslo Hoot" initial="O" />
          <ChatButton name="Skylar Mink" initial="S" />
          <ChatButton name="Henry Boyd" initial="H" />
        </div>
      </div>
    </div>
  );
}

export default function LiveChat() {
  return (
    <DashboardContainer>
      <div className="flex custom-hight antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden ">
          <ChatAside />
          <ChatArea />
        </div>
      </div>
    </DashboardContainer>
  );
}
