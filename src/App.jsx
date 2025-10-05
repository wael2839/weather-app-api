import * as React from "react";

import "./App.css";
import theme from "./Theme";

// MUI COMPONENTS
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

// == MUI COMPONENTS==

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" className="bg-blue-900 rounded-md m-0 p-2!">
          {/* card */}
          <div>
            {/* content */}
            <div>
              {/* city && time */}
              <div
                className="flex justify-start items-end gap-3 my-2 mx-3"
                dir="rtl"
              >
                <Typography variant="h2" color="white">
                  الرياض
                </Typography>
                <Typography variant="h5" color="white">
                  الاربعاء 10/10-2025 04:45
                </Typography>
              </div>
              {/*== city && time ==*/}
              <hr className="w-full" />
              {/* degree && discription */}
              <div></div>
              {/*== degree && discription ==*/}
            </div>
            {/*== content ==*/}
          </div>
          {/*== card ==*/}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
