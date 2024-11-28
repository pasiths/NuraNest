## RESTful API Endpoints

### Base URL:

`http://localhost:8000/`

### Endpoints:

#### 1. **User Registration**

- **URL:** `auth/register`
- **Method:** `POST`
- **Request Body:**

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "patient"
}
```

#### 2. **User Login**

- **URL:** `auth/login`
- **Method:** `POST`
- **Request Body:**

```json
{
    "username": "johndoe",
    "password": "securePassword123"
}
```

#### 3. **User Logout**

- **URL:** `auth/logout`
- **Method:** `POST`

#### 4. **Retrieve User by ID**

- **URL:** `users/:id`
- **Method:** `GET`

#### 5. **Update a User**

- **URL:** `users/:id`
- **Method:** `PUT`
- **Request Body:** 

```json
{
    "username": "john"
}
```

#### 6. **Delete User by ID**

- **URL:** `users/:id`
- **Method:** `DELETE`

#### 7. **Get User by ID**

- **URL:** `users/:id`
- **Method:** `GET`

