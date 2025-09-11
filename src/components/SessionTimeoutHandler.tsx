import React from "react";

interface Props {
  onLogout: () => void;
}

class SessionTimeoutHandler extends React.Component<Props> {
  inactivityTimeout: any = null;
  inactivityLimit = 15 * 60 * 1000; // 15 minutes

  componentDidMount() {
    this.startInactivityTimer();
    this.setupActivityListeners();
  }

  componentWillUnmount() {
    this.cleanupActivityListeners();
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
  }

  startInactivityTimer = () => {
    this.inactivityTimeout = setTimeout(() => {
      console.log("User inactive for 15 minutes");
      this.props.onLogout(); // Call the logout callback
    }, this.inactivityLimit);
  };

  resetInactivityTimer = () => {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
    this.startInactivityTimer();
  };

  setupActivityListeners = () => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) =>
      document.addEventListener(event, this.resetInactivityTimer)
    );

    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  };

  cleanupActivityListeners = () => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) =>
      document.removeEventListener(event, this.resetInactivityTimer)
    );

    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  };

  handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      this.resetInactivityTimer();
    }
  };

  render() {
    return null; // no UI, just functionality
  }
}

export default SessionTimeoutHandler;