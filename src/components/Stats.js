import * as React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

export function Chart(props) {

    const data = [
        {
          name: 'Win / Loose ',
          win: props.win,
          loose: props.loose,
          amt: 2400,
        },


      ];

  return (     
    <Modal
    open={props.show}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="win" fill="#8884d8" />
            <Bar dataKey="loose" fill="#82ca9d" />
        </BarChart>
        <Button variant="contained" color="success" onClick={props.close}>Close</Button>
    </Box>
    </Modal>
  );
}