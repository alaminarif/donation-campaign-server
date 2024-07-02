# Donation Campaign

## Live Link [https://donation-campaign-server.onrender.com/api/v1](https://donation-campaign-server.onrender.com/api/v1)

### **Technology Stack**

- Typescript
- Node-Express
- MongoDB
- Mongoose
- Auth0

## **Project Overview:**

The assignment aims to build a fully functional Donation Campaign website using Next.js, and incorporating user authentication, a backend (Node.js Express), and various features:

- Responsive design
- Navigation with active route highlighting
- Banner section with search
- Data fetching from a Database Server
- Card-based UI for donations
- Donation details page with donation confirmation
- User donations page
- Pie chart statistics page

## **EndPoints:**

  <details>
  <summary>
  Auth
  </summary> 
    
  - **Create A User**
     - Method:  POST
     - Access: public
     - path: /auth/create-user
  -  Login 
     - Method:  POST
     - Access: public
     - Path: /auth/login

- **Refresh Token**

  - Method: POST
  - Access: Can be accessed only by the **`specific user`**
  - path: /auth/refresh-token
  - Response Sample Pattern:

    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "User logged in successfully",
      "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY"
      }
    }
    ```

- **Change Password**

  - Method: POST
  - Access: Can be accessed only by the **`specific user`**
  - path: /auth/change-password

    </details>

<details>
  <summary>
User
  </summary> 
    
   - **Get All User**
      - Method:  GET
      - Access: Can only be accessed by admin
      - path: /users
      - Query :/users/?sortBy=phoneNumber&sortOrder=asc&page=1&limit=10
      - Search: /users/?searchTerm=290&email=arifur@gmail.com
      - filter: users/?phoneNumber=361-616-6558

- **Get Single User**

  - Method: GET
  - Access: Can only be accessed by admin
  - path: /users/:id

- **Get My Profile**
  - Method: GET
  - Access: Can be accessed only by the **`specific user`**
  - Path: /users/profile
- **Patch My Profile**

  - Method: PATCH
  - Access: Can be accessed only by the **`specific user`**
  - Path: /users/profile
  - Request body:

    ```json
    {
     "password":"mydreamwife",
      "name":{
         "firstName": "Mr. Update Password"
         "lastName": "Bhai"
       },
     "phoneNumber":"01711111111",
     "address": "Namibia",
    }
    ```

- **Delete User**
  - Method: DELETE
  - Access: Can only be accessed by admin
  - path: /users/:id
  </details>

<details>
  <summary>
Admin
  </summary>

- **Create A Admin**

  - Method: POST
  - Access: Can only be accessed by admin
  - path: /admins/create-admin

  - **Request body:**

  ```json
  {
    "password": "amTAdminbujheshunekothakoiyo",
    "role": "admin",
    "name": {
      "firstName": "Mr. Admin",
      "lastName": "Bhai"
    },
    "email": "arif@gmail.com",
    "address": "Uganda"
  }
  ```

- **Get All Admin**

  - Method: GET
  - Access : Can only be accessed by admin
  - path : /admins
  - Query : /donations/?sortBy=name&page=1&limit=10
  - Search: /donations/?searchTerm=290&email=arifur@gmail.com

- **Get Single Admin**

  - Method: GET
  - Access: Can only be accessed by admin
  - path: /admins/:id

- **Get My Profile**

  - Method: GET
  - Access: Can be accessed only by the admin of the profile
  - Path: /admis/profile

- **Patch My Profile**

  - Method: PATCH
  - Access: Can be accessed only by the admin of the profile
  - Path: /admis/profile

- **Login**

  - Method: POST
  - Access:
  - Path: /admis/login

  - **Request body :**

    ```json
    {
      "password": "amTAdminbujheshunekothakoiyo",
      "role": "admin",
      "name": {
        "firstName": "Mr. Admin",
        "lastName": "Bhai"
      },
      "email": "arif@gmail.com",
      "address": "Uganda"
    }
    ```

  - **Response Sample Pattern:**

    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "admin logged in successfully",
      "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY"
      }
    }
    ```

- **Delete Admin**

  - Method: DELETE
  - Access:
  - path: /admins/:id
  </details>

<details>
  <summary>
Donation Category
  </summary>

- Create A Categories

  - Method: POST
  - Access: Can only be accessed by admin
  - path: /categories/create-categories
  - Request body:

    ```json
    {
      "image": "url",
      "amount": "$290",
      "catygory": "health",
      "name": "Clean water for children"
    }
    ```

- **Get All Categories**

  - Method **:** GET
  - Access : public
  - path : /categories
  - Query : /categories/?sortBy=name&page=1&limit=10
  - Search: /categories/?searchTerm=290&categoryName=health

- **Get Single Categories**

  - Method: DELETE
  - Access: public
  - path: /admins/:id

- **Delete Categories**
  - Method: DELETE
  - Access: Can only be accessed by admin
  - path: /categories/:id
  </details>

<!-- <details>
  <summary>
Admin
  </summary>
</details> -->

<details>
  <summary>
Donation 
  </summary>
</details>

<details>
  <summary>
Campaign 
  </summary>
</details>

<details>
  <summary>
Blog 
  </summary>
</details>

<details>
  <summary>
Contact
  </summary>
</details>

<details>
  <summary>
Comment
  </summary>
</details>

<details>
  <summary>
Rating
  </summary>
</details>

<details>
  <summary>
Payment
  </summary>
</details>

<details>
  <summary>

  </summary>
</details>
