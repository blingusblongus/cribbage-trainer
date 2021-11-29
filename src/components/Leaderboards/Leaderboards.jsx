import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Leaderboards.css';

function Leaderboards(props) {
    const dispatch = useDispatch();
    const allScores = useSelector(store => store.allScores);

    useEffect(() => {
        dispatch({ type: 'GET_LEADERBOARD_SCORES' })
    }, [])

    // Add suffixes to places
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
        <div className="leaderboard">
            <h2 className="leaderboard-title">Leaderboards</h2>

            <TableContainer>
                <Table aria-label="simple table mui-table"
                    >
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="center">Score</TableCell>
                            <TableCell align="right">Date</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* ITERATE THROUGH SCORES, CALCULATE , RENDER TABLE INFO */}
                        {allScores.map((row, i) => {
                            let abbrScore = Math.round(row.golf_score * 100) / 100;
                            return (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {placement(i + 1)}
                                </TableCell>
                                <TableCell align="right">{row.display_name}</TableCell>
                                <TableCell align="right">{abbrScore}</TableCell>
                                <TableCell align="right">{row.timestamp.split('T')[0]}</TableCell>
                            </TableRow>
                        )})}
                     </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Leaderboards;