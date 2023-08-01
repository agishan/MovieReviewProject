import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from '../Search';
import MyPage from '../MyPage';
import Review from '../Review'
import Landing from '../Landing'
const App = () => {
return (
<Router>
<div>
  <Routes>
    <Route path="/MyPage" element={<MyPage />} />
    <Route path="/Search" element={<Search />} />
    <Route path="/Review" element={<Review />} />
    <Route path="/" element={<Landing />} />
  </Routes>
</div>
</Router>
);
};
export default App;
