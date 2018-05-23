import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { ITemplate } from './models';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import TemplatesList from './TemplatesList';
import TemplateEditor from './TemplateEditor';

import { LOADING, FAILURE, loading } from 'src/renderer/component/Templates/flux/module';
import { getPages, getStatus } from 'src/renderer/component/Templates/flux/selectors';
import { Button } from '@material-ui/core';
import { Loading } from 'src/renderer/common/Loading';
import { FluxToast, ToastType } from 'src/renderer/component/Toast/flux/actions';


export namespace MailListSpace {
    export interface IProps {
        status?: string;
        pages?: object;
        loading?: () => void;
    }

    export interface IState {
        activePage: number;
        editTemplate: null|ITemplate;
        createTemplate: boolean;
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    status: getStatus(state),
    pages: getPages(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loading: () => dispatch(loading()),
});
@connect(null, mapDispatchToProps)

@(connect(mapStateToProps, mapDispatchToProps))
class TemplatesRouter extends React.Component<MailListSpace.IProps, MailListSpace.IState> {
    state = {
        activePage: 1,
        editTemplate: null,
        createTemplate: false
    };

    selectTemplate = (template: ITemplate) => {
        this.setState({
            editTemplate: template
        });
    }

    closeTemplate = () => {
        this.setState({
            editTemplate: null,
            createTemplate: false
        });
    }

    onCreateTemplate = () => {
        this.setState({
            createTemplate: true
        });
    }

    componentDidMount(){
        if(!this.props.pages[this.state.activePage] || this.props.status !== LOADING){
            this.props.loading();
        }
    }

     componentWillUpdate(nextProps, nextState){
         if(!nextProps.pages[nextState.activePage]){
             this.props.loading();
         }
     }

    render(){
        if (this.props.status === LOADING || !(this.props.pages[this.state.activePage])) {
            return <Loading/>;
        } else if (this.props.status === FAILURE) {
            return <h1>Failure</h1>;
        } else {
            if (this.state.editTemplate !== null) {
                return <TemplateEditor template={this.state.editTemplate} closeTemplate={this.closeTemplate} />;
            } else if(this.state.createTemplate !== false) {
                return <TemplateEditor template={null} closeTemplate={this.closeTemplate} />;
            } else {
                return (
                    <div>
                      <Button variant="raised" color="primary" style={{marginBottom: 5}} onClick={this.onCreateTemplate}>
                        Add
                      </Button>
                      <TemplatesList
                         templates={this.props.pages[this.state.activePage]}
                         selectTemplate={this.selectTemplate}
                      />
                    </div>
                );
            }
        }
    }
}

export default TemplatesRouter;