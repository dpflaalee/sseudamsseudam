import React, {useState} from "react";
import GroupDropDown from "./GroupDropdown";

export default function GroupList({group}){
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{group.title}</h2>
          <p className="text-sm text-gray-600">
            멤버 수: {group.members} | 카테고리: {group.category}
          </p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-blue-500 text-sm"
        >
          {open ? '닫기' : '정보 보기'}
        </button>
      </div>
      {open && <GroupDropDown group={group} />}
    </div>
  );
}