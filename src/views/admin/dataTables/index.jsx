/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid,Grid } from "@chakra-ui/react";
import AttendanceStatus from "./components/AttendanceStatus";
import AttendanceGrid from "./components/AttendanceGrid";
import YearlyAttendanceReport from "./components/YearlyAttendanceReport";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";

export default function Settings() {

  return (
    
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box p="6">
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <AttendanceStatus />
      <YearlyAttendanceReport />
    </Grid>
    {/* <Box mt="6">
      <AttendanceGrid />
    </Box> */}
  </Box>
  </Box>
  
  );
}
