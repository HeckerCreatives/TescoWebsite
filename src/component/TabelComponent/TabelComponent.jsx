import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import React from "react";
import "./table.css";

const TabelComponent = ({ cellData = [], tableHead = [], tableType }) => {
  return (
    <>
      {tableType === "topic" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map((each) => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cellData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.topic}</TableCell>
                  <TableCell>{row.instructor}</TableCell>
                  <TableCell>{row.datecreated}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tableType === "teacher" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map((each) => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cellData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.registerDate}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tableType === "result" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map((each) => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cellData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.Topics}</TableCell>
                  <TableCell>{row.instructor}</TableCell>
                  <TableCell>{row.score}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TabelComponent;
