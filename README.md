To test All API endponts on POSTMAN you can take bellow reference:

Authentication
    1. POST  https://icinema-nf2j.onrender.com/api/auth/signup
       Description: Register a new user
       Request Body:  
          {
             "firstName": "John",
             "lastName": "Doe",
             "username": "johndoe",
             "phoneNumber": "1234567890",
             "email": "johndoe@example.com",
             "password": "password123"
          }
      2. POST  https://icinema-nf2j.onrender.com/api/auth/login
       Description: login a user
       Request Body:  
          {
             "email": "johndoe@example.com",
             "password": "password123"
          }
          
Movie Management
     1. POST  https://icinema-nf2j.onrender.com/api/movies/add-movie
       Description: Add a new movie
       Request Body:  
          {
             "title": "Inception",
             "description": "A mind-bending thriller",
             "genre": "Sci-Fi",
             "releaseDate": "2010-07-16",
             "image": "https://example.com/inception.jpg"
          }
     2. GET  https://icinema-nf2j.onrender.com//api/movies
       Description: Get all movie 
       Request Body:  
          {
             "title": "Inception",
             "description": "A mind-bending thriller",
             "genre": "Sci-Fi",
             "releaseDate": "2010-07-16",
             "image": "https://example.com/inception.jpg"
          }
     3. PUT https://icinema-nf2j.onrender.com/api/movies/update-movie/:id
            Description: Update a movie by ID
            Request Body:
              {
               "title": "Inception",
               "description": "A mind-bending thriller",
               "genre": "Sci-Fi",
               "releaseDate": "2010-07-16",
               "image": "https://example.com/inception_updated.jpg"
              }
      4. DELETE https://icinema-nf2j.onrender.com/api/movies/delete-movie/:id
                Description: Delete a movie by ID
      5. GET https://icinema-nf2j.onrender.com/api/movies/search-by-name
                Description: Search movies by title
                Query Parameter: name=Inception

Show Management
      1. POST https://icinema-nf2j.onrender.com/api/shows/add-show
               Description: Add a new show
               Request Body:
                   {
                    "movieTitle": "Inception",
                    "date": "2024-09-10",
                    "time": "19:00",
                    "availableSeats": 100,
                    "ticketPrice": 250
                   }
      2. GET https://icinema-nf2j.onrender.com/api/shows/get-all-shows
              Description: Get all shows
      2. DELETE https://icinema-nf2j.onrender.com/api/shows/delete-show/:id
              Description: Delete a show by ID
              
 Cinema Hall Management
       1. POST https://icinema-nf2j.onrender.com/api/cinema-halls/add-cinema-hall
               Description:  Add a new cinema hall
               Request Body:
                   {
                    "hallNumber": 1,
                    "filmName": "Inception",
                    "numberOfSeats": 100,
                    "numberOfSoldTickets": 0,
                    "priceOfShow": 250,
                    "date": "2024-09-10",
                    "time": "19:00"
                    }
         2. GET https://icinema-nf2j.onrender.com/api/cinema-halls
               Description: Get all cinema halls
         3. GET https://icinema-nf2j.onrender.com/api/cinema-halls/:id
               Description: Get a cinema hall by ID
         4. GET https://icinema-nf2j.onrender.com/api/cinema-halls/by-film-name
               Description:  Get cinema halls by film name
               Query Parameter: filmName=Inception
         5. DELETE https://icinema-nf2j.onrender.com/api/cinema-halls/delete-cinema-hall/:id
               Description: Delete a cinema hall by ID
               
Contact Form
       1. POST https://icinema-nf2j.onrender.com/api/contact
               Description: Submit a contact form
               Request Body:
                   {
                   "name": "John Doe",
                   "email": "johndoe@example.com",
                   "message": "I have a question about your services."
                   }
                   
Ticket Booking
        1. POST https://icinema-nf2j.onrender.com/api/tickets/add-ticket
               Description: Add a new ticket
               Request Body:
                  {
                   "email": "johndoe@example.com",
                   "movieTitle": "Inception",
                   "dateOfPurchase": "2024-09-01",
                   "timeOfShow": "19:00",
                   "ticketPrice": 250,
                   "seats": 2
                  }
         
      
   
    
       
