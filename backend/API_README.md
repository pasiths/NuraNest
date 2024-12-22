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

#### 4. **Update a User**

- **URL:** `users/:id`
- **Method:** `PUT`
- **Request Body:** 

```json
{
    "username": "john"
}
```

#### 5. **Retrieve User by ID**

- **URL:** `users/:id`
- **Method:** `GET`

#### 6. **Retrieve Users**

- **URL:** `users/`
- **Method:** `GET`

#### 7. **Retrieve Users based on Role**

- **URL:** `users/role/:role`
- **Method:** `GET`

#### 8. **Delete User by ID**

- **URL:** `users/:id`
- **Method:** `DELETE`

#### 9. **Create an Admin**

- **URL:** `admins/`
- **Method:** `POST`
- **Request Body:**

```json
{
    "userId": 3
}
```

#### 10. **Delete an Admin**

- **URL:** `admins/:id`
- **Method:** `DELETE`

#### 11. **Create a Doctor**

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

#### 12. **Update a Doctor**

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

#### 13. **Get all Doctors**

- **URL:** `doctors/`
- **Method:** `GET`

#### 14. **Get Doctor by ID**

- **URL:** `doctors/:id`
- **Method:** `GET`

#### 15. **Delete a Doctor**

- **URL:** `doctors/:id`
- **Method:** `DELETE`

#### 16. **Create a Patient**

- **URL:** `patients/`
- **Method:** `POST`
- **Request Body:**

```json
{
  "userId": 1,
  "medicalHistory": "Patient has a history of anxiety disorder and depression, undergoing therapy since 2020. No known drug allergies."
}
```

#### 17. **Update a Patient**

- **URL:** `patients/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "medicalHistory": "Patient has a history of anxiety disorder and depression, undergoing therapy since 2020. Recently diagnosed with PTSD after a traumatic event. Currently on medication."
}
```

#### 18. **Get all Patients**

- **URL:** `patients/`
- **Method:** `GET`

#### 19. **Get a Patient by ID**

- **URL:** `patients/:id`
- **Method:** `GET`

#### 20. **Delete a Patient**

- **URL:** `patients/`
- **Method:** `DELETE`

#### 21. **Create a Blog post**

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

#### 22. **Update a Blog post**

- **URL:** `blogs/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
    "body": "Updated insights into how habits form, change, and influence behavior..."
}
```

#### 23. **Retrieve a Blog post by ID**

- **URL:** `blogs/:id`
- **Method:** `GET`

#### 24. **Retrieve Blog posts**

- **URL:** `blogs/`
- **Method:** `GET`

#### 25. **Delete a Blog post**

- **URL:** `blogs/:id`
- **Method:** `DELETE`

#### 26. **Create an Appointment**

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

#### 27. **Update an Appointment**

- **URL:** `appointments/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "appointmentType": "online"
}
```

#### 28. **Get all Appointments**

- **URL:** `appointments/`
- **Method:** `GET`

#### 29. **Get an Appointment by ID**

- **URL:** `appointments/:id`
- **Method:** `GET`

#### 30. **Delete an Appointment**

- **URL:** `appointments/:id`
- **Method:** `DELETE`

#### 31. **Reschedule an Appointment**

- **URL:** `appointments/:id/reschedule`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "appointmentDate": "2024-12-10",
  "appointmentTime": "16:00"
}
```

#### 32. **Update an Appointment Status**

- **URL:** `appointments/:id/status`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "status": "completed"
}
```

#### 33. **Get Appointments by Patient**

- **URL:** `appointments/patients/:patientId`
- **Method:** `GET`

#### 34. **Get Active Appointments of a Patient**

- **URL:** `appointments/patients/:patientId/active`
- **Method:** `GET`

#### 35. **Get Upcoming Appointments of a Patient**

- **URL:** `appointments/patients/:patientId/upcoming`
- **Method:** `GET`

#### 36. **Get Appointments by Doctor**

- **URL:** `appointments/doctors/:doctorId`
- **Method:** `GET`

#### 37. **Get Active Appointments of a Doctor**

- **URL:** `appointments/doctors/:doctorId/active`
- **Method:** `GET`

#### 38. **Get Upcoming Appointments of a Doctor**

- **URL:** `appointments/doctors/:doctorId/upcoming`
- **Method:** `GET`

#### 39. **Create a Payment**

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

#### 40. **Update a Payment**

- **URL:** `payments/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
    "paymentMethod": "cash"
}
```

#### 41. **Get all Payments**

- **URL:** `payments/`
- **Method:** `GET`

#### 42. **Get a Payment by ID**

- **URL:** `payments/:id`
- **Method:** `GET`

#### 43. **Get a Payment by Patient ID**

- **URL:** `payments/patients/:patientId`
- **Method:** `GET`

#### 44. **Delete a Payment**

- **URL:** `payments/:id`
- **Method:** `DELETE`

#### 45. **Create an Application to apply as a Doctor**

- **URL:** `applications/`
- **Method:** `POST`
- **Request Body:** 

```json
{
  "name": "Dr. Jane Doe",
  "email": "jane.doe@example.com",
  "address": "123 Health St, Wellness City",
  "contactNo": "+1234567890",
  "qualification": "MBBS, MD",
  "specialization": "Cardiology",
  "workplace": "City Hospital",
  "consultationFee": 150.00,
  "availableDays": ["Monday", "Wednesday", "Friday"]
}
```

#### 46. **Update an Application**

- **URL:** `applications/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "name": "Dr. Jane"
}
```

#### 47. **Get all Applications**

- **URL:** `applications/`
- **Method:** `GET`

#### 48. **Get an Application by ID**

- **URL:** `applications/:id`
- **Method:** `GET`

#### 49. **Delete an Application**

- **URL:** `applications/:id`
- **Method:** `DELETE`

#### 50. **Mental Health Companion Chatbot**

- **URL:** `{ngrok_access_link}/chat`
- **Method:** `POST`

```json
{
  "message": "I am kinda stressed because of my project and the upcoming deadline"
}
```