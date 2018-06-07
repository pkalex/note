import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <p>
                  Cryptographic web app for private notes. we can write down
                  memoirs, passwords, living wills, and other sensitive data.{" "}
                </p>

                <form>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Create a post"
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-md-4">
                <h2>your notes</h2>
                <p>personal notes</p>
                <p>passwords</p>
                <p>numbers</p>
                <p>
                  <a className="btn btn-secondary" href="#" role="button">
                    View details &raquo;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
