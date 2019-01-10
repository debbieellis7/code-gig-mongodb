import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends Component {

  state = {
    term: ''
  };

  onHandleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    let searchItem = this.state.term;
    axios
      .get(`/api/gigs/search/${searchItem}`)
      .then(res => this.props.history.push("/gigs", res.data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h2><Link to="/"><i className="fas fa-code"></i>
            CodeGig</Link></h2>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/gigs">All Gigs</Link>
              </li>
              <li>
                <Link to="/gigs/add">Add Gig</Link>
              </li>
            </ul>
          </nav>
        </header>

        <section id="search" className="search-wrap">
          <h1>Find A Coding Gig</h1>
          <form className="search-form" onSubmit={this.onSubmit}>
            <i className="fas fa-search"></i>
            <input
              type="search"
              name="term"
              value={this.state.term}
              onChange={this.onHandleChange}
              placeholder="Javascript, PHP, Rails, etc..."
            />
            <input type="submit" value="Search" />
          </form>
        </section>
      </React.Fragment>
    )
  }
}

export default Home;