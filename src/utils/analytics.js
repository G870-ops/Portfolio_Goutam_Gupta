export const trackEvent = (eventName, metadata = {}) => {
  try {
    const timestamp = new Date().toISOString();
    const event = {
      event: eventName,
      metadata,
      timestamp,
      url: window.location.href,
    };

    const existingHistory = JSON.parse(localStorage.getItem('recruiter_analytics_log') || '[]');
    const updatedHistory = [event, ...existingHistory].slice(0, 50);
    localStorage.setItem('recruiter_analytics_log', JSON.stringify(updatedHistory));

    const counts = JSON.parse(localStorage.getItem('recruiter_analytics_counts') || '{}');
    counts[eventName] = (counts[eventName] || 0) + 1;
    localStorage.setItem('recruiter_analytics_counts', JSON.stringify(counts));

    window.dispatchEvent(new CustomEvent('portfolio_telemetry_event', { detail: event }));

    if (navigator.sendBeacon) {
      const payload = JSON.stringify(event);
      try {
        navigator.sendBeacon('/api/health', payload);
      } catch (_) {}
    }
  } catch (_) {}
};

export const getAnalyticsCounts = () => {
  try {
    return JSON.parse(localStorage.getItem('recruiter_analytics_counts') || '{}');
  } catch (_) {
    return {};
  }
};
