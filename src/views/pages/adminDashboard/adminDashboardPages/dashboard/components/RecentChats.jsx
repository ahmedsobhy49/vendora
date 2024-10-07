import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import NoDataMessage from "../../../../../../common/NoDataMessage";

const messages = [
  {
    id: 1,
    name: "Bonnie Green",
    time: "11:46",
    message:
      "That's awesome. I think our users will really appreciate the improvements.",
    avatar:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg",
  },
  {
    id: 2,
    name: "Bonnie Green",
    time: "11:46",
    message:
      "That's awesome. I think our users will really appreciate the improvements.",
    avatar:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg",
  },
  {
    id: 3,
    name: "Bonnie Green",
    time: "11:46",
    message:
      "That's awesome. I think our users will really appreciate the improvements.",
    avatar:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg",
  },
  {
    id: 4,
    name: "Bonnie Green",
    time: "11:46",
    message:
      "That's awesome. I think our users will really appreciate the improvements.",
    avatar:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg",
  },
  {
    id: 3,
    name: "Bonnie Green",
    time: "11:46",
    message:
      "That's awesome. I think our users will really appreciate the improvements.",
    avatar:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg",
  },
  {
    id: 4,
    name: "Bonnie Green",
    time: "11:46",
    message:
      "That's awesome. I think our users will really appreciate the improvements.",
    avatar:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg",
  },
  {
    id: 3,
    name: "Bonnie Green",
    time: "11:46",
    message:
      "That's awesome. I think our users will really appreciate the improvements.",
    avatar:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg",
  },
  {
    id: 4,
    name: "Bonnie Green",
    time: "11:46",
    message:
      "That's awesome. I think our users will really appreciate the improvements.",
    avatar:
      "https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg",
  },
];
const isThereMessages = Boolean(messages?.length);

function ChatHeader() {
  return (
    <div
      className={`flex items-center justify-between ${
        messages.length ? "pb-8" : "pb-4"
      }  `}
    >
      <h3 className="text-[0.95rem] sm:text-[1.1rem] xl:text-[0.95rem] 2xl:text-[1.1rem] md:tracking-wide font-bold">
        Recent Seller Messages
      </h3>
      {isThereMessages && (
        <Link
          to={"/admin/dashboard/chat-seller"}
          className="text-xs sm:text-sm gap-1 flex items-center hover:underline"
        >
          <span> View all</span> <HiOutlineArrowUpRight />
        </Link>
      )}
    </div>
  );
}

function ChatMessage({ name, time, message, avatar }) {
  return (
    <li className="flex items-start gap-2.5">
      <img
        className="w-8 h-8 rounded-full"
        src={avatar}
        alt={`${name} avatar`}
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900">{name}</span>
          <span className="text-sm font-normal text-gray-500">{time}</span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-[#1be395] rounded-e-xl rounded-es-xl">
          <p className="text-sm font-normal text-gray-900 dark:text-white">
            {message}
          </p>
        </div>
      </div>
    </li>
  );
}

function ChatMessages() {
  return (
    <ul className="flex flex-col gap-4">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          name={msg.name}
          time={msg.time}
          message={msg.message}
          avatar={msg.avatar}
        />
      ))}
    </ul>
  );
}

export default function RecentChats() {
  return (
    <div className="bg-white shadow-md w-full p-5 ">
      <ChatHeader />
      <div className="h-full min-h-[100px] max-h-[400px] xl:max-h-[400px] 2xl:max-h-[500px] overflow-auto hide-scrollbar">
        {isThereMessages ? (
          <ChatMessages />
        ) : (
          <NoDataMessage message={"No messages have been received"} />
        )}
      </div>
    </div>
  );
}
