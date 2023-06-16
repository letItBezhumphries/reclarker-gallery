import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../assets/styles/components/FeaturedArtistScroller.css";

const ScrollerTabsNav = ({ selectTab, curIdx }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState(0);
  const artistList = useSelector((state) => state.artistList);

  useEffect(() => {
    if (artistList.artists.length > 4) {
      setTabs(4);
    } else {
      setTabs(artistList.artists.length);
    }
    setActiveTab(curIdx);
  }, [curIdx, artistList]);

  return (
    <ul className="scroller-tabs-nav">
      {[...Array(tabs).keys()].map((x) => (
        <li className={activeTab === x ? "tab-dot-active" : "tab-dot"} key={x}>
          <button onClick={() => selectTab(x)} className="tab-dot-btn"></button>
        </li>
      ))}
    </ul>
  );
};

export default ScrollerTabsNav;
