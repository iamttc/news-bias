import './Container.css';
import React from 'react';
import Menu from '../menu/Menu';
import Search from '../search/Search';
import Site from '../site/Site';

const Container = () => {
    return (
        <div className="container">
            <Menu />
            <Search />
            <div className="SiteList">
                <Site title="cnn" id="1"/>
                <Site title="foxnews" id="2"/>
                <Site title="huffingtonpost" id="3"/>
                <Site title="nbcnews" id="4"/>
                <Site title="bloomberg" id="5"/>
                <Site title="nytimes" id="6"/>
            </div>
        </div>
    );
};

export default Container;
