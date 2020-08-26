# Requirements

- [Docker](https://docs.docker.com/install/)
- Docker Compose
- NodeJS v8 or grater
- yarn

# Run required services (For running mongodb in your pc)

```
docker-compose up --build -d
```

# Run App

```sh
  yarn
  yarn start
```

# Api List

```
 Add new contact
 Post -> http://localhost:5000/add-contact (add new-contact) {"name": "mahmud", "contactNo": "01833078756"}
```

```
Get all contacts
Get -> http://localhost:5000/contacts (Gives all contacts from db)

```

```
Get single contact
 Get -> http://localhost:5000/contact/:id (Gives single contacts)(you need to pass contact as params)

 example -> http://localhost:5000/contact/01833078756

```

```

 Put -> http://localhost:5000/edit-contact  (Edit existing contact) {"name": "mahmud arif", "contactNo": "01833078756"}
```

```
  Delete contact
  Delete -> http://localhost:5000/delete-contact/:id

   example -> http://localhost:5000/delete-contact/01833078756
```
