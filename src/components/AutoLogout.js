import React, { useState, useEffect } from "react";

function AutoLogout({ onLogout, timeoutInHours }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onLogout();
    }, timeoutInHours * 3600000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onLogout, timeoutInHours]);

  return null;
}

export default AutoLogout;
