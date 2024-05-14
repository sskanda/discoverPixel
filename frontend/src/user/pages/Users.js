import React from "react";
import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    { id: "1", name: "Rahil", places: 3 },
    { id: "2", name: "Zohan", places: 3 },
  ];
  return (
    <>
      <UserList items={USERS}></UserList>
    </>
  );
};

export default Users;
