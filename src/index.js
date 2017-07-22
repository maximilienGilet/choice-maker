import React from 'react';
import ReactDOM from 'react-dom';
import InlineEdit from 'react-edit-inline';
import './index.css';

class Argument extends React.Component {

    constructor(id) {
        super();
        this.state = {
            id: id,
            value : 1,
            label: 'Argument',
        };
        this.dataChanged = this.dataChanged.bind(this);
    }


    dataChanged(data) {
        let newLabel = this.state.label;
        let newValue = this.state.value;
        if (data.label) {
            newLabel = data.label;
        }
        if (data.value) {
            newValue = data.value;
        }
        this.setState({
            label: newLabel,
            value: newValue
        })
    }

    render() {
        return (
            <div className="argument">
                <InlineEdit
                    validate={customValidateText}
                    activeClassName="editing"
                    text={this.state.label}
                    paramName="label"
                    change={this.dataChanged}
                    style={{
                        backgroundColor: '#ECEFF1',
                        minWidth: 150,
                        display: 'inline-block',
                        margin: 10,
                        padding: 10,
                        fontSize: 15,
                        outline: 0,
                        border: 0
                    }}
                />
            </div>
        )
    }
}

class Board extends React.Component {
    constructor(id) {
        super();
        this.state = {
            id : id,
            label: 'Choice',
            pros: {},
            cons: {},
            prosCount: 0,
            consCount: 0,
        };
        this.dataChanged = this.dataChanged.bind(this);
        this.addPro = this.addPro.bind(this);
        this.removePro = this.removePro.bind(this);
        this.addCon = this.addCon.bind(this);
        this.removeCon = this.removeCon.bind(this);
    }

    dataChanged(data) {
        this.setState({
            label: data.label
        })
    }

    addPro(event) {
        let pros = this.state.pros;
        let count = this.state.prosCount;
        let pro = new Argument(count);
        pros['pro' + count.toString()] = pro
        this.setState({
            pros: pros,
            prosCount: count + 1
        })

    }

    removePro(pro) {
        let id = pro.state.id;
        let pros = this.state.pros;
        delete pros['pro' + id.toString()];
        this.setState({
            pros : pros
        })
    }

    addCon(event) {
        let cons = this.state.cons;
        let count = this.state.consCount;
        let con = new Argument(count);
        cons['con' + count.toString()] = con
        this.setState({
            cons: cons,
            consCount: count + 1
        })

    }

    removeCon(con) {
        let id = con.state.id;
        let cons = this.state.cons;
        delete cons['con' + id.toString()];
        this.setState({
            cons : cons
        })
    }

    render() {
        // Variables init
        let pros = this.state.pros;
        let cons = this.state.cons;
        let removePro = this.removePro;
        let removeCon = this.removeCon;
        // List pros and cons
        let prosList = Object.keys(pros).map(function(pro){
            return <li className="argument-container" key={pros[pro].state.id}><Argument value={pros[pro].id}/><div onClick={() => removePro(pros[pro])}><img className="action" src="/svg/trash.svg"/></div></li>;
        });
        let consList = Object.keys(cons).map(function(con){
            return <li className="argument-container" key={cons[con].state.id}><Argument value={cons[con].id}/><div onClick={() => removeCon(cons[con])}><img className="action" src="/svg/trash.svg"/></div></li>;
        });

        return (
            <div className="board">
                <InlineEdit
                    validate={customValidateText}
                    activeClassName="editing editable board-title"
                    text={this.state.label}
                    paramName="label"
                    change={this.dataChanged}
                    className="editable board-title"
                />
            <hr/>
                <div className="argument-list">
                    <p className="left"><img src="/svg/thumbs-up.svg" height="14" width="14"/>&nbsp;Pros :</p>
                    <ul>{prosList}</ul>
                    <div className="btn" onClick={this.addPro}>Add pro</div>
                </div>

                <div className="argument-list">
                    <p className="left"><img src="/svg/thumbs-down.svg" height="14" width="14"/>&nbsp;Cons :</p>
                    <ul>{consList}</ul>
                    <div className="btn" onClick={this.addCon}>Add con</div>
                </div>

            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            boards: {},
            boardCount: 0
        };
        this.addBoard = this.addBoard.bind(this);
        this.removeBoard = this.removeBoard.bind(this);
    }

    addBoard(event) {
        let boards = this.state.boards;
        let count = this.state.boardCount;
        let board = new Board(count);
        boards['board' + count.toString()] = board
        this.setState({
            boards: boards,
            boardCount: count + 1
        })

    }

    removeBoard(board) {
        let id = board.state.id;
        let boards = this.state.boards;
        delete boards['board' + id.toString()];
        this.setState({
            boards : boards
        })
    }

    render() {
        let removeBoard = this.removeBoard;
        let boards = this.state.boards;
        let boardList = Object.keys(boards).map(function(board) {
            return <li key={boards[board].state.id}><div className="fab ripple" onClick={() => removeBoard(boards[board])}>x</div><Board value={boards[board].state.id}/></li>;
        })
        return (
            <div className="app">
                <div id="addChoice" className="btn ripple" onClick={this.addBoard}>Add choice</div>
                <ul className="board-list">{ boardList }</ul>
            </div>
        );
    }
}

function customValidateText(text) {
  return (text.length > 0 && text.length < 64);
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
