import { Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Table from '@mui/material/Table';

export default function FolderList({ list }: { list: any[] }) {
  return (
    
        <Grid container spacing={1}>
          <Grid item xs={6}>
      <TableContainer sx={{height:"300px"}} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Leave Type</TableCell>
            <TableCell align="right">Date Expected Back</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.leave}</TableCell>
              <TableCell align="right">{row.dateExpectedBack}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
  );
}
