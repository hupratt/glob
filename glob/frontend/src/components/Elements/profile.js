import React from "react";

const ProfileWidget = () => {
  return (
    <div className="profile-sidebar">
      <div className="profile-userpic">
        <img
          src="https://avatars2.githubusercontent.com/u/38809698?s=400&u=a10478aa9a5a6709c32eec29f016150d8f5bd242&v=4"
          className="mx-auto d-block"
          alt=""
        />
      </div>
      <div className="profile-usertitle">
        <div className="profile-usertitle-name">Hugo Pratt</div>
        <div className="profile-usertitle-job">Tech enthusiast</div>
      </div>
    </div>
  );
};

export default ProfileWidget;
