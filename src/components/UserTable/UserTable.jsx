import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './UserTable.css';

function UserTable({rows}) {
    return (
        <TableContainer sx={{maxHeight: 200}}>
            <Table stickyHeader aria-label="personal score table">
                <TableHead>
                    <TableRow className="header-row">
                        <TableCell>Rank</TableCell>
                        <TableCell align="center">Score</TableCell>
                        <TableCell align="right">Date</TableCell>
                        {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => {
                        let abbrScore = Math.round(row.golf_score * 100) / 100;
                    return (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {i+1}
                            </TableCell>
                            <TableCell align="right">{abbrScore}</TableCell>
                            <TableCell align="right">{row.timestamp.split('T')[0]}</TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserTable;