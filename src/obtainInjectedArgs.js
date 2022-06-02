const searchParams = new URLSearchParams(window.location.search);
const listOfInjectedParameters = ['disputeID', 'arbitrableChainID', 'arbitratorChainID', 'arbitrableContractAddress', 'arbitrableInterfaceURI', 'arbitratorJsonRpcUrl', 'arbitrableJsonRpcUrl']

export const injectedArgs = listOfInjectedParameters.reduce(function (accumulatorObject, currentInjectedParameter) {
  return {...accumulatorObject, [currentInjectedParameter]: searchParams.get(currentInjectedParameter)}
}, {})


