import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("렌더링 오류:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <h1>페이지를 표시할 수 없습니다.</h1>
          <p>문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>

          <button type="button" onClick={this.handleRetry}>
            다시 시도
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;