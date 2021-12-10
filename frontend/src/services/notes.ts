import axios from "axios";

class Notes {
  test() {
    axios.get("/api/test/").then(value => console.log(value))
  }
}

export default new Notes();