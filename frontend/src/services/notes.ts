import axios from "axios";

class Notes {
  test() {
    axios.post("/api/test/").then(value => console.log(value))
  }
}

export default new Notes();