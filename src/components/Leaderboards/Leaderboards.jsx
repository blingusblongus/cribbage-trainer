import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function Leaderboards(props) {
    const dispatch = useDispatch();
    const allScores = useSelector(store => store.allScores);
    
    useEffect(() => {
        dispatch({type: 'GET_LEADERBOARD_SCORES'})
    },[])

    return (<>
        <div>Leaderboards</div>

        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="center">Score</TableCell>
                        <TableCell align="right">Date</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allScores.map((row, i) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {i + 1}
                            </TableCell>
                            <TableCell align="right">{row.display_name}</TableCell>
                            <TableCell align="right">{row.golf_score}</TableCell>
                            <TableCell align="right">{row.timestamp.split('T')[0]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default Leaderboards;