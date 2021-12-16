# Are.na API Wrapper 

A typed lightweight javascript API wrapper for the [Are.na](https://dev.are.na/documentation) API. 

## Getting Started

## Implemented Endpoints

| Entity  | Endpoint  | Function | Authenticated | Paginated |
| :-----: | - | - | - | - |
| **Users** | GET /v2/users/:id | User(_id_).get | - | - |
| **Users** | GET /v2/users/:id/channels | User(_id_).getChannels | yes | - | 
| **Users** | GET /v2/users/:id/following | User(_id_).getFollowers | yes | - |
| **Block** | GET /v2/blocks/:id | Block(_id_).get | - | - |
| **Block** | GET /v2/blocks/:id/channels | Block(_id_).getChannels | - | yes |
| **Block** | PUT /v2/blocks/:id | Block(_id_).update | - | yes |
| **Channel** | GET /v2/channels/:slug | Channel(_idOrSlug_).get | - | - |
| **Channel** | PUT /v2/channels/:slug | Channel(_idOrSlug_).update | - | - |
| **Channel** | DELETE /v2/channels/:slug | Channel(_idOrSlug_).delete | - | - |
| **Channel** | POST /v2/channels | createChannel | - | - |
