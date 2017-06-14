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
                <Site title="cnn"/>
                <Site title="foxnews"/>
                {/*<Site title="bloomberg"/>
                <Site title="the-new-york-times"/>*/}
            </div>
        </div>
    );
};

export default Container;
