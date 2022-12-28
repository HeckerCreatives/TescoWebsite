import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";

import React, { useState } from "react";
import PaginationAdd from "../pagination/Pagination";

import "./table.css";

const TabelComponent = ({
  cellData = [],
  pagination,
  tableHead = [],
  tableType,
}) => {
  const [data, setData] = useState([]);
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
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.topics}</TableCell>
                  <TableCell>{row.instructor}</TableCell>
                  <TableCell>{row.datecreated}</TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.2em",
                    }}
                  >
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "blue",
                        minWidth: "5em",
                        borderRadius: "0.5em",
                        border: "none",
                      }}
                    >
                      edit
                    </button>
                    <button 
                       style={{
                        color: "white",
                        backgroundColor: "red",
                        minWidth: "5em",
                        borderRadius: "0.5em",
                        border: "none",
                      }}
                    >delete</button>
                  </TableCell>
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
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.registerDate}</TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.2em",
                    }}
                  >
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "blue",
                        minWidth: "5em",
                        borderRadius: "0.5em",
                        border: "none",
                      }}
                    >
                      edit
                    </button>
                    <button 
                       style={{
                        color: "white",
                        backgroundColor: "red",
                        minWidth: "5em",
                        borderRadius: "0.5em",
                        border: "none",
                      }}
                    >delete</button>
                  </TableCell>
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
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.topic}</TableCell>
                  <TableCell>{row.instructor}</TableCell>
                  <TableCell>{row.score}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tableType === "passer" && (
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
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.topic}</TableCell>
                  <TableCell style={{ color: "green" }}>
                    {row.correct}
                  </TableCell>
                  <TableCell style={{ color: "red" }}>{row.wrong}</TableCell>
                  <TableCell
                    style={{ color: "blue" }}
                  >{`${row.result}%`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {pagination && (
        <Box
          justifyContent={"center"}
          alignItems="center"
          display={"flex"}
          margin="2em 0em"
        >
          <PaginationAdd setProducts={(e) => setData(e)} rawData={cellData} />
        </Box>
      )}
    </>
  );
};

export default TabelComponent;
