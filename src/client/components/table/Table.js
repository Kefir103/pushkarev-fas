import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TablePanel from './TablePanel';
import TableElement from './TableElement';
import Loader from '../Loader';
import { bindActionCreators } from 'redux';
import { setAppElements, setCurrentElements, setPageCount } from '../../redux/actions/dataActions';
import Paginator from './Paginator';
import { getElementsByPage } from '../../functions/dataFunctions';
import {catchError} from "../../redux/actions/appStatusActions";

const Table = (props) => {
    useEffect(() => {
        let currentElements = [];
        if (!props.filterText && !props.appElements.length) {
            currentElements = getElementsByPage(props.fullData, props.currentPage);
            props.actions.setAppElements(props.fullData);
        } else {
            currentElements = getElementsByPage(props.appElements, props.currentPage);
        }
        props.actions.setCurrentElements(currentElements);
    }, [props.fullData, props.appElements, props.currentPage]);

    const renderFilterEmptyMessage = () => {
        return (
            <p id={'filter-empty-message'}>
                Нет элементов списка, которые соответствуют Вашему запросу
            </p>
        );
    };

    const renderTable = () => {
        try {
            if (props.filterText && !props.appElements.length) {
                return renderFilterEmptyMessage();
            }

            return [
                <div className={'table'} key={'table'}>
                    <TablePanel />
                    {props.currentElements.map((element, index) => (
                        <TableElement
                            element={element}
                            elementIndex={index}
                            key={`tableElement${index}`}
                        />
                    ))}
                </div>,
                <div className={'paginator-container'} key={'paginatorContainer'}>
                    {props.pageCount > 1 ? <Paginator key={'paginator'} /> : ''}
                </div>,
            ];
        } catch (error) {
            props.actions.catchError(error);
        }
    };

    return <>{props.fullData.length ? <>{renderTable()}</> : ''}</>;
};

const mapStateToProps = (state) => {
    return {
        appElements: state.data.appElements,
        fullData: state.data.fullData,
        currentElements: state.data.currentElements,
        isLoading: state.appStatus.isLoading,
        filterText: state.filter.filterText,
        pageCount: state.data.pageCount,
        currentPage: state.filter.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setAppElements,
                setPageCount,
                setCurrentElements,
                catchError,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
