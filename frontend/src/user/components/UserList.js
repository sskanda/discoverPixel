import React from "react";
import UserItem from "./UserItem";

const UserList = (props) => {
  if (props.items.lenght === 0) return <div>No Users</div>;

  return (
    <ul>
      {props.items.map((user) => {
        return <UserItem key={user.id} name={user.name}></UserItem>;
      })}
    </ul>
  );
};

export default UserList;
