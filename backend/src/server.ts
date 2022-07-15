import { serverHttp } from "./app";

const Port = process.env.PORT || 8000;

serverHttp.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
  console.log(`Server is running on http://localhost:${Port}`);
});
