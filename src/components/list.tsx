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

export default function FolderList({ list }: { list: any[] }) {
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
    '&:nth-of-type(odd)': {
      backgroundColor: "lightblue",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <TableContainer sx={{ height: "300px" }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <StyledTableRow sx={{fontWeight:"bold"}}>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Leave Type</StyledTableCell>
            <StyledTableCell align="right">Date Expected Back</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.leave}</StyledTableCell>
              <StyledTableCell align="right">{row.dateBack}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
