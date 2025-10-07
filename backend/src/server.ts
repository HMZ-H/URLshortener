import { app } from "./infrastructure/web/expressApp.js";
import { config } from "./infrastructure/config/config.js";

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
