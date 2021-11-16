import React from 'react';

export default ({ user }) => (
  <header className="nav-bar">
    <h1>Around The Block</h1>
    <h4>Welcome { user.username }!</h4>
  </header>
);
