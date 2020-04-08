import * as React from 'react';
import styled from 'styled-components';
import { render } from 'react-dom';

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
`;

export class Splash extends React.Component<
  {},
  { blink: boolean; value: string }
> {
  state = {
    blink: true,
    value: 'top -u skye',
  };

  timeout: number;

  componentDidMount() {
    this.timeout = setTimeout(() => this.blink(), 1e3);
    // document.addEventListener('keydown', (ev) => this.onKeyPress(ev));
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    // document.removeEventListener('keydown', (ev) => this.onKeyPress(ev));
  }

  blink() {
    this.setState({ blink: !this.state.blink });
    setTimeout(() => this.blink(), 1e3);
  }

  onKeyPress(ev: KeyboardEvent) {
    if (ev.isComposing || ev.keyCode === 229) {
      return;
    }

    this.setState({ value: this.state.value + ev.key });
  }

  render() {
    return (
      <Centered>
        <h2
          className="cmd"
          style={{ paddingBottom: screen.height - window.innerHeight }}
        >
          <b>
            <span>➜</span> <span>devfox</span>{' '}
            <span>
              git:(<span>master</span>)
            </span>{' '}
          </b>
          <span>{this.state.value}</span>
          <span>{!this.state.blink ? '█' : <>&nbsp;</>}</span>
          <b></b>
        </h2>
      </Centered>
    );
  }
}
