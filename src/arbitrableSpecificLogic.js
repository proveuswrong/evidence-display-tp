import {ipfsGateway} from "./constants";

const queryTemplate = (endpoint, query) =>
  fetch(endpoint, {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
    method: "POST",
    mode: "cors",
  }).then(r => r.json()).then(json => json.data)


export const getClaimByDisputeID = async (subgraphEndpoint, disputeID) => {

  return queryTemplate(subgraphEndpoint, `{
  claims(where: {disputeID: "${disputeID}"}) {
    id
    claimID
    owner
    category
    bounty
    status
    lastBalanceUpdate
    disputeID
    withdrawalPermittedAt
    lastCalculatedScore
    arbitrator
    arbitratorExtraData
  }

  }`).then(data => {
    return data.claims[0]
  }).catch(err => console.error)
}

export const getClaimContent = (claimID) => fetch(ipfsGateway + claimID).then((response => {
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }

  return response.json().then()
}))


