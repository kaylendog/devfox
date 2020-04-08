import * as React from 'react';
import axios from 'axios';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export class RepositryList extends React.Component<
  {},
  { repos: Repository[] }
> {
  state = {
    repos: [],
  };

  mounted = false;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.mounted = true;
    this.fetchData();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async fetchData() {
    const { data } = await axios.get<Repository[]>(
      'https://api.github.com/users/skyefoxie/repos'
    );

    if (!this.mounted) {
      return;
    }

    this.setState({ repos: data });
  }
}
