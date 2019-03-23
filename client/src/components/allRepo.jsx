import React from 'react';

class AllRepo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  render() {
   return (<div>
   <a href={this.props.repos.url.replace('api', "www").replace("repos", "")}>{this.props.repos.repoName}</a> 
   </div>) 
 }
}

export default AllRepo;