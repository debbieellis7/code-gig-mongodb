import React, { Component } from 'react';
import axios from 'axios';

import Header from '../layout/Header';

class Add extends Component {

  state = {
    title: '',
    technologies: '',
    budget: '',
    description: '',
    contact_email: '',
    errors: []
  };

  onHandleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    let postData = {
      title: this.state.title,
      technologies: this.state.technologies,
      budget: this.state.budget,
      description: this.state.description,
      contact_email: this.state.contact_email
    };

    axios
      .post('/api/gigs/add', postData)
      .then(res => this.props.history.push("/gigs"))
      .catch(err => {
        this.setState({ errors: err.response.data })
      });
  }

  displayErrors = () => {
    let data;
    if (this.state.errors.length > 0) {
      data = (
        <React.Fragment>
          {this.state.errors.map((item, index) => (
            <div className="alert alert-danger" key={index} role="alert">
              {item.text}
            </div>
          ))}
        </React.Fragment>
      )
    }
    return data;
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <section id="add" className="container">
          <div className="form-wrap">
            <h1>Add A Gig</h1>
            <p>Your contact email will be shared with registered users to apply to your gig</p>
            {this.displayErrors()}
            <form onSubmit={this.onSubmit}>
              <div className="input-group">
                <label htmlFor="title">Gig Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={this.state.title}
                  onChange={this.onHandleChange}
                  className="input-box"
                  placeholder="eg. Small Wordpress website, React developer"
                  maxLength="100"
                />
              </div>
              <div className="input-group">
                <label htmlFor="technologies">Technologies Needed</label>
                <input
                  type="text"
                  name="technologies"
                  id="technologies"
                  value={this.state.technologies}
                  onChange={this.onHandleChange}
                  className="input-box"
                  placeholder="eg. javascript, react, PHP"
                  maxLength="100"
                />
              </div>
              <div className="input-group">
                <label htmlFor="budget">Budget (Leave blank for unknown)</label>
                <input
                  type="number"
                  name="budget"
                  id="budget"
                  value={this.state.budget}
                  onChange={this.onHandleChange}
                  className="input-box"
                  placeholder="eg. 500, 5000, 10000"
                />
              </div>
              <div className="input-group">
                <label htmlFor="description">Gig Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.onHandleChange}
                  className="input-box"
                  placeholder="Describe the details of the gig"
                  rows="10"
                />
              </div>
              <div className="input-group">
                <label htmlFor="budget">Contact Email</label>
                <input
                  type="email"
                  name="contact_email"
                  id="contactemail"
                  value={this.state.contact_email}
                  onChange={this.onHandleChange}
                  className="input-box"
                  placeholder="Enter an email"
                />
              </div>
              <input type="submit" value="Add Gig" className="btn btn-reverse" />
            </form>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default Add;