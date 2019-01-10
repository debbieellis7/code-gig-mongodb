import React, { Component } from 'react';
import axios from 'axios';

import Header from '../layout/Header';

class Gigs extends Component {

  state = {
    // Home page Search Result
    homeSearchResult: this.props.location.state,
    gigs: [],
  }

  componentDidMount() {
    // Check if home search result is empty or not
    if (!!this.state.homeSearchResult) {
      this.setState({ gigs: this.state.homeSearchResult })
    } else {
      this.getData();
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.getData();
  }

  getData = () => {
    axios
      .get('/api/gigs')
      .then(res => this.setState({ gigs: res.data }))
      .catch(err => console.log(err));
  }

  content = () => {
    let placeHolder;
    if (this.state.gigs.length > 0) {
      placeHolder = (
        <React.Fragment>
          {this.state.gigs.map((item, index) => (
            <div className="gig" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                <li>Budget: {item.budget}</li>
                <li><a href={`mailto:${item.contact_email}`} className="btn btn-reverse">Apply Now</a></li>
              </ul>
              <div className="tech">
                <small>Technologies Needed: <span>{item.technologies.join(", ")}</span></small>
              </div>
            </div>
          ))}
        </React.Fragment>
      )
    } else {
      placeHolder = (
        <p>No gigs available</p>
      )
    }
    return placeHolder;
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <section id="gigs" className="container">
          <h1>All Gigs</h1>
          {this.content()}
        </section>
      </React.Fragment>
    )
  }
}

export default Gigs;
