# Payever Test Task

## Installation
```bash
npm i
docker compose up -d
npm run start
```

## Execute tests
```bash
npm run test
```

## Usage

### POST /api/users
Use this endpoint to register users.

```json
{
	"email": "test@gmail.com",
}
```

### GET /api/users/:userId
Use this endpoint to retrieve a single user by id.

### GET /api/users/:userId/avatar
Use this endpoint to retrieve a base 64 string from the 'avatar' URL.

### DELETE /api/users/:userId/avatar
Use this endpoint to delete the file from the fileSystem storage and from the stored entry from db.
