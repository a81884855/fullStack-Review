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
      search: null,
    }
  }

  componentDidMount(){
    $.get('http://localhost:1128/repos', (repos)=>{
      let limit = this.state.repos.concat(repos)
      limit.length > 25 ? repos = limit.slice(limit.length-25) : null
      this.setState({
        repos: repos.reverse()
      });
      console.log(repos)
    });
  }

  search (term) {
    let duplicated = false
    console.log(`${term} was searched`);
    for(var i of this.state.repos){
      i.username === term ? duplicated = true: null
    }

  if(!duplicated){
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
  }
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
      {this.state.repos.map((repo)=>
      <div><AllRepo repos={repo}/></div>
     )}
      
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));