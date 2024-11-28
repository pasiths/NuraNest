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

#### 8. **Create an Admin**

- **URL:** `admins/`
- **Method:** `POST`
- **Request Body:**

```json
{
    "userId": 3
}
```

#### 9. **Delete an Admin**

- **URL:** `admins/:id`
- **Method:** `DELETE`

#### 10. **Create a Doctor**

- **URL:** `doctors/`
- **Method:** `POST`
- **Request Body:**

```json
{
  "userId": 2,
  "qualification": "PhD in Clinical Psychology",
  "specialization": "Anxiety and Depression",
  "workplace": "Psychology Center, Downtown",
  "consultationFee": 100,
  "availableDays": ["Monday", "Tuesday", "Friday"]
}
```

#### 11. **Update a Doctor**

- **URL:** `doctors/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
    "workplace": "Mental Health Center, Downtown",
    "consultationFee": 120,
    "availableDays": ["Monday", "Tuesday", "Friday"]
}
```

#### 12. **Get all Doctors**

- **URL:** `doctors/`
- **Method:** `GET`

#### 13. **Get Doctor by ID**

- **URL:** `doctors/:id`
- **Method:** `GET`

#### 14. **Delete a Doctor**

- **URL:** `doctors/:id`
- **Method:** `DELETE`

#### 15. **Create a Patient**

- **URL:** `patients/`
- **Method:** `POST`
- **Request Body:**

```json
{
  "userId": 1,
  "medicalHistory": "Patient has a history of anxiety disorder and depression, undergoing therapy since 2020. No known drug allergies."
}
```

#### 16. **Update a Patient**

- **URL:** `patients/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "medicalHistory": "Patient has a history of anxiety disorder and depression, undergoing therapy since 2020. Recently diagnosed with PTSD after a traumatic event. Currently on medication."
}
```

#### 17. **Get all Patients**

- **URL:** `patients/`
- **Method:** `GET`

#### 18. **Get a Patient by ID**

- **URL:** `patients/:id`
- **Method:** `GET`

#### 19. **Delete a Patient**

- **URL:** `patients/`
- **Method:** `DELETE`

#### 20. **Create a Blog post**

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

#### 21. **Update a Blog post**

- **URL:** `blogs/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
    "body": "Updated insights into how habits form, change, and influence behavior..."
}
```

#### 22. **Retrieve a Blog post by ID**

- **URL:** `blogs/:id`
- **Method:** `GET`

#### 23. **Retrieve Blog posts**

- **URL:** `blogs/`
- **Method:** `GET`

#### 24. **Delete a Blog post**

- **URL:** `blogs/:id`
- **Method:** `DELETE`

#### 25. **Create an Appointment**

- **URL:** `appointments/`
- **Method:** `POST`
- **Request Body:**

```json
{
  "appointmentDate": "2024-12-01",
  "appointmentTime": "10:00",
  "appointmentType": "physical",
  "appointmentLocation": "Room 101, Psychology Center",
  "additionalInfo": "First-time consultation for anxiety.",
  "patientId": 1,
  "doctorId": 1
}
```

#### 26. **Update an Appointment**

- **URL:** `appointments/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "appointmentType": "online"
}
```

#### 27. **Get all Appointments**

- **URL:** `appointments/`
- **Method:** `GET`

#### 28. **Get an Appointment by ID**

- **URL:** `appointments/:id`
- **Method:** `GET`

#### 29. **Delete an Appointment**

- **URL:** `appointments/:id`
- **Method:** `DELETE`

#### 30. **Create a Payment**

- **URL:** `payments/`
- **Method:** `POST`
- **Request Body:**

```json
{
  "paymentMethod": "credit card",
  "paymentStatus": "success",
  "paymentDate": "2024-11-28T10:30:00Z",
  "amount": 150.00,
  "patientId": 1
}
```

#### 31. **Update a Payment**

- **URL:** `payments/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
    "paymentMethod": "cash"
}
```

#### 32. **Get all Payments**

- **URL:** `payments/`
- **Method:** `GET`

#### 33. **Get a Payment by ID**

- **URL:** `payments/:id`
- **Method:** `GET`

#### 34. **Delete a Payment**

- **URL:** `payments/:id`
- **Method:** `DELETE`