import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './UserTable.css';

function UserTable({rows}) {

    // placement suffix utility
    const placement = (index) => {
        let j = index % 10,
            k = index % 100;
        if (j == 1 && k != 11) {
            return index + "st";
        }
        if (j == 2 && k != 12) {
            return index + "nd";
        }
        if (j == 3 && k != 13) {
            return index + "rd";
        }
        return index + "th";
    }

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
                                {placement(i+1)}
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