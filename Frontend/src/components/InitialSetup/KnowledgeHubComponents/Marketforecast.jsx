
import marketData from "../../../data/Marketrates.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const MarketRates = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "80%", margin: "0 auto", mt: 4 }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Market Rates
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="market rates table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Price (per kg)
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Price (per quintal)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {marketData.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item["price/kg"]}</TableCell>
              <TableCell align="right">{item["price/quintal"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MarketRates;