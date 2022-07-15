import { Birthday } from "./birthday";
import { Cpf } from "./cpf";
import { Email } from "./email";
import { Name } from "./name";
import { Password } from "./password";
import { Image } from "./image";

export const ValidateData = {
  Cpf: new Cpf(),
  Email: new Email(),
  Password: new Password(),
  Birthday: new Birthday(),
  Name: new Name(),
  Image: new Image(),
};
