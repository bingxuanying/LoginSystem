import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortAlphaUp,
  faSortAlphaDown,
  faSortAmountUp,
  faSortAmountDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import "./Table.css";

class UserInfoTable extends Component {
  constructor() {
    super();

    this.state = {
      pageIndex: 1,
      pageCount: 10,
      loadData: false,
      loadPage: 1,
      userInfo: [],
      CompanyNameFilterIcon: faSortAlphaUp,
      TrapNumFilterIcon: faSort
    };

    this.handleAlphaFilter = this.handleAlphaFilter.bind(this);
    this.handleAmountFilter = this.handleAmountFilter.bind(this);

    this.handlePaginationStart = this.handlePaginationStart.bind(this);
    this.handlePaginationPre = this.handlePaginationPre.bind(this);
    this.handlePaginationNext = this.handlePaginationNext.bind(this);
    this.handlePaginationEnd = this.handlePaginationEnd.bind(this);
  }

  componentDidMount(e) {
    let order = "";
    if (this.state.CompanyNameFilterIcon === faSort) {
      order =
        this.state.TrapNumFilterIcon === faSortAmountUp
          ? "AmountUp"
          : "AmountDown";
    } else {
      order =
        this.state.CompanyNameFilterIcon === faSortAlphaUp
          ? "AlphaUp"
          : "AlphaDown";
    }

    let pageInfo = {
      pageNum: this.state.loadPage,
      order: order
    };

    fetch("/data/fetchUserInfo", {
      method: "POST",
      body: JSON.stringify(pageInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let extra = 6 - data.length;
        for (let i = 0; i < extra; i++) {
          data.push({});
        }
        // console.log(this.state.CompanyNameFilterIcon === faSortAlphaUp);
        this.setState({ userInfo: data });
      });
  }

  componentDidUpdate(loadData) {
    if (this.state.loadData === true) {
      let order = "";
      if (this.state.CompanyNameFilterIcon === faSort) {
        order =
          this.state.TrapNumFilterIcon === faSortAmountUp
            ? "AmountUp"
            : "AmountDown";
      } else {
        order =
          this.state.CompanyNameFilterIcon === faSortAlphaUp
            ? "AlphaUp"
            : "AlphaDown";
      }

      let pageInfo = {
        pageNum: this.state.loadPage,
        order: order
      };

      // fetch("/data/fetchUserInfo", {
      //   method: "POST",
      //   body: JSON.stringify(pageInfo),
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     let extra = 6 - data.length;
      //     for (let i = 0; i < extra; i++) {
      //       data.push({});
      //     }

      //     this.setState({
      //       userInfo: data,
      //       loadData: false
      //     });
      //   });
    }
  }

  handleAlphaFilter(e) {
    // console.log(this.state.CompanyNameFilterIcon.iconName);
    this.setState({
      TrapNumFilterIcon: faSort
    });
    switch (this.state.CompanyNameFilterIcon.iconName) {
      case "sort":
        this.setState({
          CompanyNameFilterIcon: faSortAlphaUp
        });
        break;
      case "sort-alpha-up":
        this.setState({
          CompanyNameFilterIcon: faSortAlphaDown
        });
        break;
      case "sort-alpha-down":
        this.setState({
          CompanyNameFilterIcon: faSortAlphaUp
        });
        break;
    }
    this.setState({
      loadData: true
    });
  }

  handleAmountFilter(e) {
    e.preventDefault();
    this.setState({
      CompanyNameFilterIcon: faSort
    });
    switch (this.state.TrapNumFilterIcon.iconName) {
      case "sort":
        this.setState({
          TrapNumFilterIcon: faSortAmountUp
        });
        break;
      case "sort-amount-up":
        this.setState({
          TrapNumFilterIcon: faSortAmountDown
        });
        break;
      case "sort-amount-down":
        this.setState({
          TrapNumFilterIcon: faSortAmountUp
        });
        break;
    }
    this.setState({
      loadData: true
    });
  }

  handlePaginationStart(e) {}

  handlePaginationPre(e) {}

  handlePaginationNext(e) {
    let nextPage = this.state.pageIndex + 1;
    this.setState({
      loadPage: nextPage,
      loadData: true
    });
    console.log(nextPage);
  }

  handlePaginationEnd(e) {}

  render() {
    const data = this.state.userInfo;

    return (
      <div className="box user-box">
        <div className="box-header">
          <h3 className="box-title">User Data Table</h3>
        </div>
        <div className="box-body">
          <table>
            <thead>
              <tr>
                <th>
                  Company Name{" "}
                  <button
                    className="btn-filter"
                    onClick={this.handleAlphaFilter}
                  >
                    <FontAwesomeIcon
                      icon={this.state.CompanyNameFilterIcon}
                    ></FontAwesomeIcon>
                  </button>
                </th>
                <th>
                  Number of Traps{" "}
                  <button
                    className="btn-filter"
                    onClick={this.handleAmountFilter}
                  >
                    <FontAwesomeIcon
                      icon={this.state.TrapNumFilterIcon}
                    ></FontAwesomeIcon>
                  </button>
                </th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.company}>
                  <td>{row.company ? row.company : null}</td>
                  <td>{row.totalTraps ? row.totalTraps : null}</td>
                  <td>
                    {row._id
                      ? row._id.slice(Math.max(row._id.length - 10, 1))
                      : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            <button onClick={this.handlePaginationStart}>
              <FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>
            </button>{" "}
            <button onClick={this.handlePaginationPre}>
              <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
            </button>{" "}
            <span>
              Page {this.state.pageIndex} of {this.state.pageCount}{" "}
            </span>
            <button onClick={this.handlePaginationNext}>
              <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
            </button>{" "}
            <button onClick={this.handlePaginationEnd}>
              <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfoTable;
