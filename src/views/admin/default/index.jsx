import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import ComplexTable from "views/admin/default/components/ComplexTable";
import { columnsDataComplex } from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import MarkAttendance from "./components/MyAttendance";
import LeaveRequestForm from "./components/LeaveApplication";
import { LeaveRequestCard } from "./components/LeaveRequest";

export default function UserReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MarkAttendance />

        <LeaveRequestForm />
      </SimpleGrid>

      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <ComplexTable />
      </SimpleGrid> */}
    </Box>
  );
}
