import mongoose from "mongoose";

import config from "../config/database";

class Database {
  constructor() {
    this.connection = mongoose.connect(
      config.url,
      {
        // changed line 11 to 'useNewUrlParser' because of newer versions of mongoDB
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database(); 