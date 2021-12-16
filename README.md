# Are.na API Wrapper 

A typed javascript wrapper for the [Are.na](https://dev.are.na/) API. Currently implements all but 3 endpoints in the [official documentation](https://dev.are.na/documentation).

> __Note:__ Attributes returned from the API do not exactly match those within the documentation. As such there may be additional attributes returned from the API that are not defined within the types.

## Getting Started

## Endpoints

### Implemented
| Entity  | Endpoint  | Function | Authenticated | Paginated |
| :-----: | - | - | - | - |
| **Users** | GET /v2/users/:id | User(_id_).get | - | - |
| **Users** | GET /v2/users/:id/channels | User(_id_).getChannels | yes | - | 
| **Users** | GET /v2/users/:id/following | User(_id_).getFollowers | yes | - |
| **Block** | GET /v2/blocks/:id | Block(_id_).get | - | - |
| **Block** | GET /v2/blocks/:id/channels | Block(_id_).getChannels | - | yes |
| **Block** | PUT /v2/blocks/:id | Block(_id_).update | - | yes |
| **Channel** | GET /v2/channels/:slug | Channel(_idOrSlug_).get | - | - |
| **Channel** | PUT /v2/channels/:slug | Channel(_idOrSlug_).update | yes | - |
| **Channel** | DELETE /v2/channels/:slug | Channel(_idOrSlug_).delete | yes | - |
| **Channel** | POST /v2/channels | createChannel | yes | - |
| **Channel** | GET /v2/channels | createChannel | yes | - |
| **Channel** | GET /v2/channels/:id/connections | Channel(_idOrSlug_).getConnections | - | yes |
| **Channel** | GET /v2/channels/:id/channels | Channel(_idOrSlug_).getChannels | - | yes |
| **Channel** | GET /v2/channels/:id/contents | Channel(_idOrSlug_).getContent | - | yes |
| **Channel** | POST /v2/channels/:id/block | Channel(_idOrSlug_).addBlock | yes | - |
| **Channel** | DELETE /v2/channels/:id/block/:id | Channel(_idOrSlug_).deleteBlock | yes | - |
| **Channel** | GET /v2/channels/:id/collaborators | Channel(_idOrSlug_).getCollaborators | - | yes |
| **Channel** | POST /v2/channels/:id/collaborators | Channel(_idOrSlug_).addCollaborators | yes | yes |
| **Channel** | DELETE /v2/channels/:id/collaborators | Channel(_idOrSlug_).deleteCollaborators | yes | yes |

<br>

### Not Implemented
| Entity  | Endpoint  | Reason |
| :-----: | - | - |
| **Channels** | GET /v2/channels/ | Successful request consistently responses with an error code of 500 |
| **Channels** | PUT /v2/channels/:channel_id/blocks/:id/selection | Limited documentation on use case & how to form a request |
| **Channels** | PUT /v2/channels/:slug/sort | Limited documentation on use case & how to form a request |

<br>


## Future Improvements

- Unit test coverage
- Under-go a discovery on the shape of the data returned from the API & update the types accordingly
