import styled from "@emotion/styled";
import {
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import Table from "@mui/material/Table";
import { IApplyForLeave } from "../models/leaveApplicationModel";

export default function FolderList({ list, stage }: { list: IApplyForLeave[], stage:boolean|undefined|null }) {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "darkblue",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "lightblue",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <TableContainer sx={{ height: "300px" }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <StyledTableRow sx={{ fontWeight: "bold" }}>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Leave Type</StyledTableCell>
            {stage?<StyledTableCell align="right">Stage</StyledTableCell>:null}
            <StyledTableCell align="right">Date Expected Back</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <StyledTableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.fullName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.leave.name
              .toLowerCase()
              .split(" ")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1),
              )
              .join(" ")}</StyledTableCell>
              {stage?<StyledTableCell align="right">{row.stage}</StyledTableCell>:null}
              <StyledTableCell align="right">{new Date(row.endDate).toDateString()}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
