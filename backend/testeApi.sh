# Register User
#  url http://localhost:8000/user/signup


# firstName: string;
# lastName: string;
# email: string;
# password: string;
# birthday: string;
# CPF: string;
# image: string;



curl -X POST -H "Content-Type: application/json" -d '{"firstName": "teste","lastName": "teste","email": "teste@teste.com","password": "teste","birthday": "03/03/2004","CPF": "123456789","image": "teste"
}' http://localhost:8000/user/signup > teste.json

# Login user
#  url http://localhost:8000/user/login

  # Email    String  @unique
  # Password String

curl -X POST -H "Content-Type: application/json" -d '{"email": "teste@teste.com","password": "teste"}' http://localhost:8000/user/login > teste.json
