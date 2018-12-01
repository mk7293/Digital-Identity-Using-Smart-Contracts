import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import identity from "./identity";
import { saveProfile, sendProfile, viewProfile } from "./events";

class App extends Component {
  state = {
    enabled: false,
    name: "",
    address: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: ""
  };

  saveProfile = async event => {
    if (this.state.password !== this.state.confirmPassword) {
      event.preventDefault();
      this.setState({ errorMessage: "Password do no match" });
    } else {
      saveProfile(this.state);
    }
  };

  viewProfile = async event => {
    this.state.enabled = true;
  };

  sendProfile = async event => {
    sendProfile(this.state);
  };

  render() {
    const { enabled } = this.state;
    return (
      <div>
        <h1>Digital Identity Using Smart Contracts</h1>
        <br />

        <form onSubmit={this.saveProfile} error={!!this.state.errorMessage}>
          <div>
            <label class="control-label col-sm-1" />
            <label class="control-label col-sm-3" for="name">
              Name:
            </label>

            <input
              class="col-sm-7"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </div>
          <br />
          <br />
          <div>
            <label class="control-label col-sm-1" />
            <label class="control-label col-sm-3" for="email">
              Email:
            </label>

            <input
              class="col-sm-7"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </div>

          <br />
          <br />
          <div>
            <label class="control-label col-sm-1" />
            <label class="control-label col-sm-3" for="address">
              Address:
            </label>

            <input
              class="col-sm-7"
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </div>

          <br />
          <br />
          <div>
            <label class="control-label col-sm-1" />
            <label class="control-label col-sm-3" for="DOB">
              DOB:
            </label>

            <input
              class="col-sm-7"
              type="date"
              value={this.state.dob}
              onChange={event => this.setState({ dob: event.target.value })}
            />
          </div>

          <br />
          <br />
          <div>
            <label class="control-label col-sm-1" />
            <label class="control-label col-sm-3" for="phone">
              Phone No:
            </label>

            <input
              class="col-sm-7"
              value={this.state.phone}
              onChange={event => this.setState({ phone: event.target.value })}
            />
          </div>

          <br />
          <br />
          <div>
            <label class="control-label col-sm-1" />
            <label class="control-label col-sm-3" for="password">
              Password:
            </label>

            <input
              class="col-sm-7"
              type="password"
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              required
            />
          </div>

          <br />
          <br />
          <div>
            <label class="control-label col-sm-1" />
            <label class="control-label col-sm-3" for="confirm_password">
              Confirm Password:
            </label>

            <input
              class="col-sm-7"
              type="password"
              value={this.state.confirmPassword}
              onChange={event =>
                this.setState({ confirmPassword: event.target.value })
              }
              required
            />
          </div>
          <h4 color="red">{this.state.errorMessage}</h4>

          <br />
          <br />
          <br />
          <div>
            <label class="control-label col-sm-1" />
            <button class="btn btn-primary control-label col-sm-3">
              Save Profile
            </button>
            <label class="control-label col-sm-1" />
            <button
              class="btn btn-primary control-label col-sm-3"
              onClick={this.sendProfile}
            >
              Send Profile
            </button>
            <label class="control-label col-sm-1" />
            <button
              class="btn btn-primary control-label col-sm-3"
              onClick={this.viewProfile}
            >
              View Profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
