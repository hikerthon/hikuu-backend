# Hikoo Backend

## Prerequisite
- node.js version 10+
- npm

## Installation

### Step 1
```bash
$ npm install --no-save
```

### Step 2
If FCM account server is not configured, go to firebase console to aquire a account service json file and put it under fcm folder and name it hikoo.json.

### Step 3
Create ormconfig.json
example
```json
{
  "default": {
    "name": "default",
    "type": "mysql",
    "host": "database-hikoo-backend.example.ap-northeast-2000.rds.amazonaws.com",
    "port": 3306,
    "username": "example",
    "password": "example",
    "database": "hikoo",
    "entities": [
      "dist/**/*.entity{.ts,.js}"
    ]
  },
  "mobile": {
    "name": "mobile",
    "type": "mysql",
    "host": "database-hikoo-backend.example.ap-northeast-2000.rds.amazonaws.com",
    "port": 3306,
    "username": "example",
    "password": "example",
    "database": "hikoo",
    "entities": [
      "dist/**/*.entity{.ts,.js}"
    ]
  }
}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API
```bash
$ npm run start:dev

$ google-chrome http://localhost:3000/api
```

## License

  Nest is [MIT licensed](LICENSE).
