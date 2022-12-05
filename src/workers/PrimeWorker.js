function findPrimes(fromNumber, toNumber) {
  let list = [];
  for (let i = fromNumber; i <= toNumber; i++) {
    if (i > 1) list.push(i);
  }

  let maxDiv = Math.round(Math.sqrt(toNumber));
  let primes = [];

  for (let i = 0; i < list.length; i++) {
    let failed = false;
    for (let j = 2; j <= maxDiv; j++) {
      if (list[i] != j && list[i] % j == 0) {
        failed = true;
      } else if (j == maxDiv && failed == false) {
        primes.push(list[i]);
      }
    }
  }

  return primes;
}

onmessage = (e) => {
  console.log("on message");
  //   console.log(e);
  let fromNumber = e.data.from;
  let toNumber = e.data.to;
  console.log("worker is working");
  let primes = findPrimes(fromNumber, toNumber);
  console.log("working run success");
  postMessage(primes);
};
