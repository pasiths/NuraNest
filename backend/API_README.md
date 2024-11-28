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

#### 7. **Retrieve Users**

- **URL:** `users/`
- **Method:** `GET`

#### 6. **Update a User**

- **URL:** `users/:id`
- **Method:** `PUT`
- **Request Body:** 

```json
{
    "username": "john"
}
```

#### 7. **Delete User by ID**

- **URL:** `users/:id`
- **Method:** `DELETE`

#### 8. **Create a Blog post**

- **URL:** `blogs/`
- **Method:** `POST`
- **Request Body:**

```json
{
  "title": "The Psychology of Habits",
  "body": "Habits shape our daily lives and influence our long-term success...",
  "tags": ["Psychology", "Habits", "Self-improvement"],
  "description": "An exploration of how habits form and their impact on behavior.",
  "keywords": ["psychology", "habits", "behavior"],
  "authorId": 1
}
```

#### 9. **Update a Blog post**

- **URL:** `blogs/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
    "body": "Updated insights into how habits form, change, and influence behavior..."
}
```

#### 10. **Retrieve a Blog post by ID**

- **URL:** `blogs/:id`
- **Method:** `GET`

#### 11. **Retrieve Blog posts**

- **URL:** `blogs/`
- **Method:** `GET`

#### 11. **Delete a Blog post**

- **URL:** `blogs/:id`
- **Method:** `DELETE`