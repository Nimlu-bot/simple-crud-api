# 🚀 Welcome to simple crud api

1. clone repo or download surce code and unpack

2. go to the folder where package.json located and run ``` npm i```

3. to run development server ``` npm run start:dev```

4. to build production app run ``` npm run start:prod``` bundle located in dist folder

5. to run tests ``` npm run test``` this. coomand run 4 e2e test scenarious. Before start testing you  **MUST**  start dev server ``` npm run start:dev```

Server is runing on 8000 port and assepter such methods as GET,POST,PUT,DELETE.

To get all persons use ```GET localhost:8000/person```

To get a specified person use ```GET localhost:8000/person/ID```

To create person use ```POST localhost:8000/person``` with valid person data

To change person data with specified id use ```PUT localhost:8000/person\ID``` with full new person data

To delete person use ```DELETE localhost:8000/person/ID```


For check use ```localhost:8000/person```

Test json may be 
{"name":"name12",
  "age":42,
    "hobbies":["hobbi1","hobbi2"]
}


Tests are testing all types of responces include 500 status

