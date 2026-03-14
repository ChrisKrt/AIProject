

- do not use verbs in method names, use nouns instead (e.g. `getUser` should be `user`, `createOrder` should be `order`)
- use the same name for the method and the endpoint (e.g. `GET /users` should be `users`, `POST /orders` should be `orders`)
- use plural nouns for collections (e.g. `users` instead of `user`, `orders` instead of `order`)
- use singular nouns for single resources (e.g. `user` instead of `users`, `order` instead of `orders`)
- pay attention to the HTTP status codes and use them correctly (e.g. `201 Created` for successful POST, `400 Bad Request` for validation errors, `404 Not Found` for non-existing resources)