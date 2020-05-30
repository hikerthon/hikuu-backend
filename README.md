![image](doc/source/image/Hikoo_logo.png)

# Hikoo Backend

## Prerequisite
- node.js version 10+
- npm

## Installation

### Step 1
Clone hikoo backend code
```bash
$ git clone https://github.com/hikerthon/hikoo-backend.git
```

### Step 2
Install package
```bash
$ npm install --no-save
```

### Step 3
If FCM account server is not configured, go to firebase console to acquire a account service json file and put it under fcm folder and name it hikoo.json.

### Step 4
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

### Step 5
Add jwt.conf.json to project root
```json
{
  "secret": "victoria's secret"
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
