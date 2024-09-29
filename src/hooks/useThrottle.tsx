function useThrottle() {
  const throttleFunc = (func: any, delay: number) => {
    let prev = 0;
    return (...args: any) => {
      let now = new Date().getTime();
      let diff = now - prev;
      if (diff > delay) {
        prev = now;
        return func(...args);
      }
    };
  };
  return throttleFunc;
}

export default useThrottle;
