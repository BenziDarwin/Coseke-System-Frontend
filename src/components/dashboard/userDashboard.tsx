import React from "react";
import FolderList from "../list";

const lt = [
  { name: "Ssali Benjamin", leave: "Sick Leave" },
  { name: "Ssali Benjamin", leave: "Sick Leave" },
  { name: "Ssali Benjamin", leave: "Sick Leave" },
  { name: "Ssali Benjamin", leave: "Sick Leave" },
];

function UserDashboard() {
  return (
    <div>
      <FolderList list={lt} />
    </div>
  );
}

export default UserDashboard;
