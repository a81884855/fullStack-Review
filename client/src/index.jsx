import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import AllRepo from './components/allRepo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      search: null
    }
  }

  componentDidMount(){
    $.get('http://localhost:1128/repos', (repos)=>{
      this.setState({
        repos: repos
      });
      console.log(repos)
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    this.setState({
      search: term
    })
    $.ajax({
      type: "POST",
      url: 'http://localhost:1128/repos',
      data: {username : `${term}`},
      success: ()=> {this.componentDidMount()}
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      {this.state.repos.map((repo)=>
      <div><AllRepo repos={repo}/></div>
     )}
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));