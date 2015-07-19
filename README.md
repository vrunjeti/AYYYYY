# bldr

This is now hosted! View at: http://45.55.77.223:9000/#/ (a lovely ip address indeed)

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Setup

Make sure you have Node.js installed.

Run `npm install -g grunt-cli bower yo generator-karma generator-angular` first

## Build & development

Run `grunt` to run everything. Server will start and the website will be available on port 9000

Run `grunt build` for building and `grunt serve` for preview.

To run server, `cd` into `/server`, run `npm install` if it's the first time, and run `nodemon server.js` to start the server.

You can use `node server.js` but I think you'll want to `npm install -g nodemon` and use `nodemon`

## Testing

Running `grunt test` will run the unit tests with karma.

## API Documentation

### Get All Projects

    GET /api/projects

**Response**

Note: The following objects are technically not valid (don't have location)

    [
        {
            "_id": "55a9d09bf1d276801c000001",
            "status": "started",
            "category": "test category",
            "description": "testing desc",
            "name": "test 1",
            "__v": 0,
            "images": [],
            "participants": []
        },
        {
            "_id": "55a9d0abf1d276801c000002",
            "status": "almost done",
            "category": "category",
            "description": "desc",
            "name": "test 2",
            "__v": 0,
            "images": [],
            "participants": []
        },
        {
            "_id": "55a9d0bff1d276801c000003",
            "status": "not yet started",
            "category": "category2",
            "description": "desccccc",
            "name": "test 3",
            "__v": 0,
            "images": [],
            "participants": []
        }
    ]

### Create New Project

    POST /api/projects


**Input**

|   Name   |  Type  | Description | Example |
|:--------:|:------:|:-----------:|:-----------:|
| name | string |   **Required** | Build a Treehouse
| location | Object (look below) |   **Required** | look below
| description | string |   **Required** | On an oak tree
| category | string |   **Required** | Outdoor
| status | string | Optional | In progress
| participants | string array | list of names | ['Emily', 'Paul']
| images | string array | urls for hosted images | ['something.com/image.jpg']

**Location Object**

|   Name   |  Type  | Description | Example |
|:--------:|:------:|:-----------:|:-----------:|
| latitude | Number |   **Required** | 42.347805
| longitude | Number |   **Required** | -71.077498
| address | string |   **Required** | 100 Huntington Ave Boston, MA 02116

**Response**

    {
        "message": "Project successfully created",
        "data": {
            "__v": 0,
            "status": "In progress",
            "category": "Outdoor",
            "description": "On an oak tree",
            "name": "Build a Treehouse",
            "_id": "55a9f9fc3d6d77b826000003",
            "images": [
                "something.com/image.jpg"
            ],
            "participants": [
                "Emily",
                "Paul"
            ],
            "location": {
                'latitude': 42.347805,
                'longitude': -71.077498,
                'address': '100 Huntington Ave Boston, MA 02116'
            }
        }
    }

### Get Single Project

    GET /api/projects/:id


**Input**

|   Name   |  Type  | Description | Example |
|:--------:|:------:|:-----------:|:-----------:|
| id | string |   **Required** | 55a9f9fc3d6d77b826000003


**Response**

    {
        "_id": "55a9f9fc3d6d77b826000003",
        "status": "In progress",
        "category": "Outdoor",
        "description": "On an oak tree",
        "name": "Build a Treehouse",
        "__v": 0,
        "images": [
            "something.com/image.jpg"
        ],
        "participants": [
            "Emily",
            "Paul"
        ],
        "location": {
            'latitude': 42.347805,
            'longitude': -71.077498,
            'address': '100 Huntington Ave Boston, MA 02116'
        }
    }

### Edit Single Project

    PUT /api/projects/:id


**Input**

|   Name   |  Type  | Description | Example |
|:--------:|:------:|:-----------:|:-----------:|
| id | string |   **Required** | 55a9f9fc3d6d77b826000003
| name | string |   **Required** | Build a Treehouse
| location | Object (look below) |   **Required** | look below
| description | string |   **Required** | On an oak tree
| category | string |   **Required** | Outdoor
| status | string | Optional | In progress
| participants | string array | list of names | ['Emily', 'Paul']
| images | string array | urls for hosted images | ['something.com/image.jpg']

**Location Object**

|   Name   |  Type  | Description | Example |
|:--------:|:------:|:-----------:|:-----------:|
| latitude | Number |   **Required** | 42.347805
| longitude | Number |   **Required** | -71.077498
| address | string |   **Required** | 100 Huntington Ave Boston, MA 02116


**Response**

    {
        "message": "Project successfully updated!",
        "data": {
            "_id": "55a9f9fc3d6d77b826000003",
            "status": "Complete",
            "category": "Outdoor",
            "description": "On an oak tree",
            "name": "Build a Treehouse",
            "__v": 0,
            "images": [
                "something.com/image.jpg"
            ],
            "participants": [
                "Emily",
                "Paul"
            ],
            "location": {
                'latitude': 42.347805,
                'longitude': -71.077498,
                'address': '100 Huntington Ave Boston, MA 02116'
            }
        }
    }

### Delete Project

    DELETE /api/projects/:id


**Input**

|   Name   |  Type  | Description | Example |
|:--------:|:------:|:-----------:|:-----------:|
| id | string |   **Required** | 55a9d09bf1d276801c000001


**Response**

    {
        "message": "Project successfully deleted!"
    }

### Add Participants To Project

    PUT /api/addparticipant


**Input**

|   Name   |  Type  | Description | Example |
|:--------:|:------:|:-----------:|:-----------:|
| id | string |   **Required** | 55a9d09bf1d276801c000001
| participant | string |   **Required** | Rose

**Response**

    {
        "message": "Participant Rose successfully added!",
        "data": {
            "_id": "55aaa501b06c040403000006",
            "status": "Status unavailable",
            "category": "General",
            "description": "skdc s,c",
            "name": "lsafkjbv klsajdn kas",
            "__v": 0,
            "images": [],
            "participants": [
                "Rose"
            ],
            "location": {
                "latitude": 42.34926227091114,
                "longitude": -71.07596933841705,
                "address": "138 Saint James Avenue, Boston, MA 02116, USA"
            }
        }
    }
