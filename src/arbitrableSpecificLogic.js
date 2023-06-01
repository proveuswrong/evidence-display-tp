import { ipfsGateway } from "./constants";

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
  })
    .then((r) => r.json())
    .then((json) => json.data);

export const getArticleByDisputeID = async (subgraphEndpoint, disputeID) => {
  return queryTemplate(
    subgraphEndpoint,
    `{
        disputeEntity(id: "${disputeID}") {
            id
            article{
                id
                articleID
                owner
                category
                bounty
            }
        }
    }`
  )
    .then((data) => {
      console.log(data);
      return data.disputeEntity;
    })
    .catch((err) => console.error);
};

export const getArticleContent = (articleID) =>
  fetch(ipfsGateway + articleID).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    return response.json().then();
  });
