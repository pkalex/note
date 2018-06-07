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
                      className="form-control form-control-lg textbox-custom"
                      placeholder="Create a post"
                    />
                  </div>
                  <button type="submit" className="btn btn-custom">
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-md-4 right">
                <h2 className="header-custom">notes</h2>
                <p>
                  personal notes <i className="fas fa-key btn-key" />{" "}
                  <i className="fas fa-times-circle btn-del" />
                </p>
                <p>
                  passwords <i className="fas fa-key btn-key" />{" "}
                  <i className="fas fa-times-circle btn-del" />
                </p>
                <p>
                  numbers <i className="fas fa-key btn-key" />{" "}
                  <i className="fas fa-times-circle btn-del" />
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
