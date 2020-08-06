import React from 'react';
import { connect } from 'react-redux';
import Table from './components/table/Table';
import SideMenu from './components/sidemenu/SideMenu';
import Header from './components/Header';
import AddEntryComponent from './components/entry/AddEntryComponent';

const App = (props) => {
    return (
        <>
            <Header />
            <SideMenu />
            <div className={'app-container'}>
                <AddEntryComponent />
                <Table />
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.appStatus.isLoading,
    };
};

export default connect(mapStateToProps)(App);
