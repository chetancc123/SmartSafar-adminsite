import { Heading } from '@chakra-ui/react';
import React, { Component } from 'react';
import axios from 'axios';

export class TotalBalance extends Component {
  state = {
    totalBalance: null,
    error: null,
  };

  componentDidMount() {
    this.fetchTotalBalance();
  }

  fetchTotalBalance = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/hub/totalAmountOfcurrentMonth/1',
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        this.setState({ totalBalance: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    const { totalBalance, error } = this.state;
    return (
      <div>
        {error ? (
          <Heading>{error}</Heading>
        ) : (
          <Heading>{totalBalance !== null ? totalBalance : 'Loading...'}</Heading>
        )}
      </div>
    );
  }
}

export default TotalBalance;
